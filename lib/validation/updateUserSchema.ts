import { z } from "zod";

// Zod schema for updating a user
export const UpdateUserSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"), // required to identify the user
  name: z.string().min(4, "Name must be at least 4 characters").optional(),
  city: z.string().min(2, "City must be at least 2 characters").optional(),
  state: z.string().min(2, "State must be at least 2 characters").optional(),
  address: z.string().min(6, "Address must be at least 6 characters").optional(),
  password: z.string().min(5, "Password must be at least 5 characters").optional(),
  mobile: z.string().regex(/^\d{10}$/, "Mobile must be exactly 10 digits").optional(),
});

// ✅ Infer TS type from schema
export type UserInputSchema = z.infer<typeof UpdateUserSchema>;
