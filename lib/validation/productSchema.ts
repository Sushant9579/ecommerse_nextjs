import { z } from 'zod';

// 🧠 Zod schema for incoming product data
export const productSchema = z.object({
  title: z.string().min(1),
  product: z.string().min(1),
  desc: z.string().min(1),
  img: z.string(),
  category: z.string().min(1),
  size: z.string().min(1),       
  color: z.string().min(1),     
  price: z.number().nonnegative(),
  availableQty: z.number().int().nonnegative(),
});

// ✅ Infer TS type from schema
export type ProductInput = z.infer<typeof productSchema>;
