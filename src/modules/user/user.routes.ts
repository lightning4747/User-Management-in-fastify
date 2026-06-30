import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "@fastify/type-provider-zod"; // 1. Import the type provider
import { loginHandler, registerUserHandler } from "./user.controller.js";
import { createUserResponseSchema, createUserSchema, LoginResponse, LoginSchema } from "./user.schema.js";

async function userRoutes(fastify: FastifyInstance) {
    const server = fastify.withTypeProvider<ZodTypeProvider>();
    server.post("/", {
        schema: {
            body : createUserSchema,
            response: {
                201: createUserResponseSchema
            }
        },
    }, registerUserHandler);

    server.post('/login', {}, loginHandler)
}

export default userRoutes;