import { z } from "zod";

// Base user schema with common fields
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Schema for public user data (safe to expose)
export const PublicUserSchema = UserSchema.pick({
  id: true,
  name: true,
  email: true,
  image: true,
});

// Type exports
export type User = z.infer<typeof UserSchema>;
export type PublicUser = z.infer<typeof PublicUserSchema>;
