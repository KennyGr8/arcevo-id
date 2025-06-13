import { z } from "zod";

// Shared validators
const email = z
  .string()
  .trim()
  .toLowerCase()
  .email("Invalid email address");

const password = z
  .string()
  .min(6, "Password must be at least 6 characters");

// Auth schemas

export const registerSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required"),
    email,
    password,
    confirmPassword: password,
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

export const loginSchema = z.object({
  email,
  password,
});

export const reactivateSchema = z.object({
  email,
  password,
});
