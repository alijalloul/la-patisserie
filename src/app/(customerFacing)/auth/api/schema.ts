import { z } from "zod";

// Define schema for signup
export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6), // Adjust length as needed
});

// Define schema for login
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Define schema for email verification token
export const verifyEmailSchema = z.object({
  token: z.string(),
});
