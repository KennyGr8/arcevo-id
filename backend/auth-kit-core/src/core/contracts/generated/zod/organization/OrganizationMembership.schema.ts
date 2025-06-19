import { z } from "zod";

export const OrganizationMembershipSchema = z.object({
  id: z.string(),
  userId: z.string(),
  user: z.any().optional(),
  organizationId: z.string(),
  organization: z.any().optional(),
  role: z.enum(["OWNER", "ADMIN", "MEMBER", "GUEST"]),
  invitedById: z.string().optional(),
  invitedBy: z.any().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
