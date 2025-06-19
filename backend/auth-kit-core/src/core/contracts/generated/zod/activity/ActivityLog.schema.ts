import { z } from "zod";

export const ActivityLogSchema = z.object({
  id: z.string(),
  userId: z.string(),
  user: z.any().optional(),
  action: z.enum(["LOGIN", "LOGOUT", "MFA_ENABLED", "PASSWORD_RESET"]),
  ip: z.string().optional(),
  metadata: z.any().optional(),
  userAgent: z.string().optional(),
  createdAt: z.coerce.date(),
});
