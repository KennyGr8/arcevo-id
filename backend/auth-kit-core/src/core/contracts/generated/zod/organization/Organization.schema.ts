import { z } from "zod";

export const OrganizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  memberships: z.any().optional(),
  domains: z.any().optional(),
  invites: z.any().optional(),
  ssoProviders: z.any().optional(),
});
