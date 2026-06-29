import type { FastifyReply, FastifyRequest } from "fastify";
import { createUserInput } from './user.schema.js';
import { createUser } from "./user.service.js";
import { error } from "node:console";

export const registerUserHandler = async (req: FastifyRequest <{ Body : createUserInput }>, res: FastifyReply) => {
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