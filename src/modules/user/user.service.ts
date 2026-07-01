import prisma from "./utils/prisma.js";
import type { CreateUserInput } from "./user.schema.js";
import { hashPassword } from "./utils/hash.js";
import { email, Schema } from "zod";



export async function createUser(input: CreateUserInput) {
    const { password, ...rest } = input;
    const { hash, salt } = hashPassword(password);

    return prisma.user.create({
        data: { ...rest, salt, password: hash }
    });
}   

export async function finduserByEmail(email: string) {
    return prisma.user.findUnique({where: {email}})
}

export async function findUsers() {
    return prisma.user.findMany({
        select: {
            name : true,
            id: true,
            email: true
        }
    })
}