import { z } from "zod";

export const OrganizationDomainSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  organization: z.any().optional(),
  domain: z.string(),
  verified: z.boolean(),
});
