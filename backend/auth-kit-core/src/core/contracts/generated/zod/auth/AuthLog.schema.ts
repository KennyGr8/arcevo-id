import { z } from "zod";

export const AuthLogSchema = z.object({
  id: z.string(),
  userId: z.string(),
  user: z.any().optional(),
  event: z.enum([
    "LOGIN",
    "LOGOUT",
    "MFA_SUCCESS",
    "MFA_FAILED",
    "EMAIL_VERIFIED",
    "PASSWORD_CHANGED",
    "TOKEN_EXPIRED",
  ]),
  ip: z.string().optional(),
  userAgent: z.string().optional(),
  platform: z.string().optional(),
  browser: z.string().optional(),
  locationCity: z.string().optional(),
  locationCountry: z.string().optional(),
  createdAt: z.coerce.date(),
});
