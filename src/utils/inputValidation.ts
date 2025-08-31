import { z } from "zod";

const emailSchema = z.email({ message: "Invalid email address format" });

const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters long" })
  .max(30, { message: "Password must be at most 30 characters long" });

export const signUp = z.object({
  name: z.string().min(2),
  email: emailSchema,
  password: passwordSchema,
  profileUrl: z.string(),
});

export const signIn = z.object({
  email: emailSchema,
  password: passwordSchema,
});
