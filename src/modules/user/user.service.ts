import prisma from "./utils/prisma.js";
import { createUserInput } from "./user.schema.js";

export async function createUser(input: createUserInput) {
    const user = await prisma.user.create({
        data: input
    });
}
 