import { z } from "zod";

export const OrganizationInviteSchema = z.object({
  id: z.string(),
  email: z.string(),
  organizationId: z.string(),
  organization: z.any().optional(),
  role: z.enum(["OWNER", "ADMIN", "MEMBER", "GUEST"]),
  invitedById: z.string().optional(),
  invitedBy: z.any().optional(),
  token: z.string(),
  expiresAt: z.coerce.date(),
  acceptedAt: z.coerce.date().optional(),
  createdAt: z.coerce.date(),
});
