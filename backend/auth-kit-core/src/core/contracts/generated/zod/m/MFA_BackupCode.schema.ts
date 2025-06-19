import { z } from "zod";

export const MFA_BackupCodeSchema = z.object({
  id: z.string(),
  code: z.string(),
  usedAt: z.coerce.date().optional(),
  mfaId: z.string(),
  mfa: z.any().optional(),
});
