import { z } from 'zod';

// Zod schema for incoming product data
export const userSchema = z.object({
  name: z.string().min(4),
  email: z.string().email(),
  city: z.string().min(2),
  state: z.string().min(3),
  address: z.string().min(6),
  password: z.string().min(5),
  mobile: z.string().min(10).max(10),
});

// ✅ Infer TS type from schema
export type UserInput = z.infer<typeof userSchema>;
