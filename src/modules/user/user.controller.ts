import type { FastifyReply, FastifyRequest } from "fastify";

export const registerUserHandler = async (req: FastifyRequest, res: FastifyReply) => {
    res.code(200);
}