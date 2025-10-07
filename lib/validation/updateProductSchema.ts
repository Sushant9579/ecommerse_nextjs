import { z } from 'zod';

export const updateProductSchema = z.object({
  id: z.string().min(1), // required to identify which product to update
}).merge(
  z.object({
    title: z.string().min(1).optional(),
    product: z.string().min(1).optional(),
    desc: z.string().min(1).optional(),
    img: z.string().optional(),
    category: z.string().min(1).optional(),
    size: z.string().min(1).optional(),           
    color: z.string().min(1).optional(),          
    price: z.number().nonnegative().optional(),
    availableQty: z.number().int().nonnegative().optional(),
  })
);

export type UpdateProductInput = z.infer<typeof updateProductSchema>;

