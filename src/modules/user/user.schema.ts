import { create } from 'node:domain';
import { z } from 'zod';

const createUserInput = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" }),

    name: z.string().min(3, "Name must be between 3 to 30 characters")
    .max(31, "Name must be between 3 to 30 characters"),

    password: z.string()
    .min(3, "Password must be at least 8 characters")
    .max(128, "Password is too long")
});

export type createUserInput = z.infer<typeof createUserInput>;