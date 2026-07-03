import { z } from "zod";

const ProductInput = z.object({
    price: z.string(),
    title: z.string().min(3, "len is too short").max(20, "len is too long, try under 20"),
    content: z.string().max(600, "Too big, try under 600 chars").optional(),
})

const productGenerated = z.object({
    id: z.number(),
    create_at: z.string(),
    update_at: z.string(),
    ownerId: z.number()
})

export const createProductSchema = ProductInput;
export const createProductResponseSchema = ProductInput.merge(productGenerated);
export const productOwnerSchema = z.object({
    id: z.number(),
    name: z.string().nullable()
});
export const productResponseSchema = createProductResponseSchema.extend({
    owner: productOwnerSchema
});
export const productsResponseSchema = z.array(productResponseSchema);

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type CreateProductResponse = z.infer<typeof createProductResponseSchema>;
export type ProductResponse = z.infer<typeof productResponseSchema>;
export type ProductsResponse = z.infer<typeof productsResponseSchema>;
