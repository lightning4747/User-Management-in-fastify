import Fastify from 'fastify'

const server = Fastify();
const PORT = 3000;

server.get('/health', (req, res) => {
    return res.code(200).send({ status: "OK"});
})

const main = async () => {
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