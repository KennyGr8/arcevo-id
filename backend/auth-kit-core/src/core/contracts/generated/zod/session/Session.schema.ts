import { z } from "zod";

export const SessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  user: z.any().optional(),
  ip: z.string().optional(),
  userAgent: z.string().optional(),
  deviceName: z.string().optional(),
  platform: z.string().optional(),
  browser: z.string().optional(),
  locationCity: z.string().optional(),
  locationCountry: z.string().optional(),
  fingerprint: z.string().optional(),
  createdAt: z.coerce.date(),
  lastActiveAt: z.coerce.date().optional(),
  expiresAt: z.coerce.date(),
  valid: z.boolean(),
  refreshToken: z.string().optional(),
  firstSeenAt: z.coerce.date().optional(),
  lastUsedAt: z.coerce.date().optional(),
});
