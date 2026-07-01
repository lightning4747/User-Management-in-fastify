import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "@fastify/type-provider-zod"; // 1. Import the type provider
import { loginHandler, registerUserHandler, getUserHandler } from "./user.controller.js";
import { createUserResponseSchema, createUserSchema, getUserListResponse, LoginResponse, LoginSchema,  } from "./user.schema.js";

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

    server.post('/login', {
        schema: {
            body: LoginSchema,
            response: { 200: LoginResponse }
        }
    }, loginHandler)

    server.get('/', {
        schema: {
            response: { 200: getUserListResponse }
        }
    }, getUserHandler)
}

export default userRoutes;