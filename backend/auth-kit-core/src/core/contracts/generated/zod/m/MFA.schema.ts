import { z } from "zod";

export const MFASchema = z.object({
  id: z.string(),
  userId: z.string(),
  user: z.any().optional(),
  secret: z.string(),
  enabled: z.boolean(),
  verifiedAt: z.coerce.date().optional(),
  createdAt: z.coerce.date(),
  backupCodes: z.any().optional(),
});
