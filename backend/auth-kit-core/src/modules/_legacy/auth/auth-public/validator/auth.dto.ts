import { z } from "zod";
import { loginSchema, reactivateSchema, registerSchema } from "./auth.zod";

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
export type ReactivateDto = z.infer<typeof reactivateSchema>;
