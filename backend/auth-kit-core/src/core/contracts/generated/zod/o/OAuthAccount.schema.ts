import { z } from "zod";

export const OAuthAccountSchema = z.object({
  id: z.string(),
  userId: z.string(),
  user: z.any().optional(),
  provider: z.enum(["GITHUB", "GOOGLE", "DISCORD"]),
  providerUserId: z.string(),
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
  expiresAt: z.coerce.date().optional(),
  createdAt: z.coerce.date(),
});
