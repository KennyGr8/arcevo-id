import { z } from "zod";

export const EmailTokenSchema = z.object({
  id: z.string(),
  email: z.string(),
  token: z.string(),
  type: z.enum(["VERIFY_EMAIL", "RESET_PASSWORD", "MAGIC_LINK", "TOTP"]),
  expiresAt: z.coerce.date(),
  userId: z.string().optional(),
  user: z.any().optional(),
  createdAt: z.coerce.date(),
});
