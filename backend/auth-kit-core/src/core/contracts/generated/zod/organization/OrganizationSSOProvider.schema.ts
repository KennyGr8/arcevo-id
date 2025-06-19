import { z } from "zod";

export const OrganizationSSOProviderSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  organization: z.any().optional(),
  provider: z.string(),
  ssoConfig: z.any(),
  createdAt: z.coerce.date(),
});
