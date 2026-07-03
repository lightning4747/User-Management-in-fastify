// src/modules/product/product.service.ts
import prisma from "../user/utils/prisma.js";
import type { CreateProductInput } from "./product.schema.js";

export async function createProduct(data: CreateProductInput & { ownerId: number }) {
    return prisma.product.create({
        data: {
            title: data.title,
            price: Number(data.price),
            ownerId: data.ownerId,
            content: data.content ?? null 
        }
    });
}

export async function getProducts() {
    return prisma.product.findMany({
        select: {
            content: true,
            title: true,
            price: true,
            id: true,
            create_at: true,
            update_at: true,
            ownerId: true,
            owner : {
                select: {
                    name: true,
                    id: true
                }
            }
        }
    })
}