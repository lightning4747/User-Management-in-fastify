import { z } from 'zod';

export const userCore = z.object({
  email : z.string()
           .trim()
           .min(1, { message: "Email is required" })
           .email({ message: "Invalid email format" }),
  name: z
    .string()
    .min(3, { message: "Name must be between 3 to 30 characters" })
    .max(31, { message: "Name must be between 3 to 30 characters" }),         
});

export const createUserSchema = userCore.extend({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }) 
    .max(128, { message: "Password is too long" }),
});

export const createUserResponseSchema = userCore.extend({
  id: z.number(),
});

export const LoginSchema = z.object({
  email : z.string()
           .trim()
           .min(1, { message: "Email is required" })
           .email({ message: "Invalid email format" }),
  password: z.string()
            .min(8, { message: "Password must be at least 8 characters" }) 
            .max(128, { message: "Password is too long" })         
});

export const LoginResponse = z.object({
  accessToken: z.string()
});

export const getUserResponseSchema = z.object({
  id: z.number(),
  email : z.string()
           .trim()
           .min(1, { message: "Email is required" })
           .email({ message: "Invalid email format" }),
  name : z.string().nullable()         
});

export const getUserListResponse = z.array(getUserResponseSchema);

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type CreateUserResponseInput = z.infer<typeof createUserResponseSchema>;
export type LoginRequest = z.infer<typeof LoginSchema>
export type LoginResponse = z.infer<typeof LoginResponse>
export type getUserResponseSchema = z.infer<typeof getUserResponseSchema>