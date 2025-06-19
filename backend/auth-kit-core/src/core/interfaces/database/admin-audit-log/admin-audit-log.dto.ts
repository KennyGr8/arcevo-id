import type { AdminAction } from "@prisma-enums";

export type CreateAdminAuditLogDto = {
  action: AdminAction;
  actorId?: string;
  target?: string;
  meta?: Record<string, any>;
};

export type UpdateAdminAuditLogDto = Partial<CreateAdminAuditLogDto>;
