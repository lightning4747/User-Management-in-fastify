import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateUserInput, LoginRequest } from './user.schema.js';
import { createUser, finduserByEmail, findUsers } from "./user.service.js";
import { verifyPassword } from "./utils/hash.js";
import { server } from "../../app.js";

export const registerUserHandler = async (req: FastifyRequest <{ Body : CreateUserInput }>, res: FastifyReply) => {
    const body = req.body;

    try {
        const user = await createUser(body);
        return res.code(201).send(user);
    }
    catch (e) {
        console.log(e);
        return res.code(500).send({ message: "Internal server error", error: e});
    }
}

export const loginHandler = async (req: FastifyRequest <{ Body: LoginRequest }>, res: FastifyReply) => {
    const data = req.body;

    const user = await finduserByEmail(data.email);

    if(!user) return res.code(404).send({message: "invalid mail or password"});

    const correctPassword = verifyPassword({
        candidatePassword: data.password,
        salt: user.salt,
        hash: user.password 
    });

    if(correctPassword) {
        const {password, salt, ...rest} = user;
        return { accessToken: server.jwt.sign(rest) };
    }

    return res.code(404).send({message: "invalid mail or password"});
}

export const getUserHandler = async () => {
    const users = await findUsers();
    return users;
}