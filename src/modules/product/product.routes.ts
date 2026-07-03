import { createHandler, getHandler } from "./product.controller.js";
import { createProductSchema, productResponseSchema, productsResponseSchema } from "./product.schema.js";
import { ZodTypeProvider } from "@fastify/type-provider-zod";
import { FastifyInstance } from "fastify";

export async function  productRoutes(fastify: FastifyInstance) {
    const server = fastify.withTypeProvider<ZodTypeProvider>();

    server.post('/', {
       preHandler: [server.authenticate],
       schema: {
        body: createProductSchema,
        response: {
           201: productResponseSchema
        }
       }
    }, createHandler)

    server.get('/', {
       preHandler: [server.authenticate],
       schema: {
           response: {
               200: productsResponseSchema
           }
       }
    }, getHandler)
}

export default productRoutes;