import Fastify, { FastifyReply, FastifyRequest, type FastifyInstance } from 'fastify'
import { validatorCompiler, serializerCompiler, jsonSchemaTransform } from "@fastify/type-provider-zod";
import userRoutes from './modules/user/user.routes.js';
import fjwt from '@fastify/jwt';    

export const server: FastifyInstance = Fastify();
const PORT = 3000;

server.register(fjwt, {
    secret: "fweovskjfdukfdsukggudsggiufdsguidfsgkjgsdgkkh"
});

server.decorate("authenticate", async (req: FastifyRequest, res: FastifyReply) => {
    try {
        await req.jwtVerify()
    }
    catch(e) {
        res.send(e);
    }
})

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.get('/health', (req, res) => {
    return res.code(200).send({ status: "OK"});
})

const main = async () => {

    server.register(userRoutes, {prefix: '/user'});

    try {
        await server.listen({ port: PORT, host: '0.0.0.0'});
        console.log(`Server listening on port https://localhost:${PORT}`);
    }
    catch(e) {
        console.error(e);
        process.exit(1);
    }
}

main();