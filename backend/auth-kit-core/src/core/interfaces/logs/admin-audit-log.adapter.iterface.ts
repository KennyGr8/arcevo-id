import { AdminAuditLog } from "@generated/prisma";
import { AdminAction } from "@prisma-enums";

export interface CreateAdminAuditLogInput {
  adminId: string;
  targetUserId: string;
  action: AdminAction;
  reason?: string;
  metadata?: Record<string, any>;
  ip?: string;
  userAgent?: string;
}

export interface IAdminAuditLogAdapter {
  create(data: CreateAdminAuditLogInput): Promise<AdminAuditLog>;
  findManyByAdmin(adminId: string): Promise<AdminAuditLog[]>;
  findManyByTarget(targetUserId: string): Promise<AdminAuditLog[]>;
}
