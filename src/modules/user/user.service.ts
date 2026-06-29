import prisma from "./utils/prisma.js";
import { createUserInput } from "./user.schema.js";
import { hashPassword } from "./utils/hash.js";

export async function createUser(input: createUserInput) {
    const { password, ...rest} = input;
    const { hash, salt } = hashPassword(password);

    return prisma.user.create({
        data: {...rest, salt, password: hash}
    });
}
 