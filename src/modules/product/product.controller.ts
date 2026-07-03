import { FastifyReply, FastifyRequest } from "fastify";
import { createProduct, getProducts } from "./product.service.js";
import type { CreateProductInput } from "./product.schema.js";

export async function createHandler(req: FastifyRequest<{ Body: CreateProductInput }>, reply: FastifyReply) {
    const user = req.user as { id: number; email: string };
    const product = await createProduct({...req.body , ownerId: user.id});
    return reply.code(201).send(product);
}

export async function getHandler(_req: FastifyRequest, reply: FastifyReply) {
    const products = await getProducts();
    return reply.code(200).send(products);
}