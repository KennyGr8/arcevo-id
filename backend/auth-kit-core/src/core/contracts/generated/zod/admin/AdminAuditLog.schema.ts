import { z } from "zod";

export const AdminAuditLogSchema = z.object({
  id: z.string(),
  action: z.enum([
    "USER_BAN",
    "USER_UNBAN",
    "ACCOUNT_DELETED",
    "ORG_CREATED",
    "ORG_MEMBER_REMOVED",
    "ORG_INVITE_SENT",
    "SUBSCRIPTION_UPDATED",
  ]),
  actorId: z.string().optional(),
  actor: z.any().optional(),
  target: z.string().optional(),
  meta: z.any().optional(),
  createdAt: z.coerce.date(),
});
