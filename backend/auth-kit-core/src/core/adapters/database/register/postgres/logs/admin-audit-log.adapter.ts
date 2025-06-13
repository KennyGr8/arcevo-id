import { prisma } from "@database/prisma";
import type { AdminAuditLog } from "@generated/prisma";
import type {
  CreateAdminAuditLogInput,
  IAdminAuditLogAdapter,
} from "./admin-audit-log.adapter.interface";

export const adminAuditLogAdapter: IAdminAuditLogAdapter = {
  async create(data) {
    return prisma.adminAuditLog.create({
      data,
    });
  },

  async findManyByAdmin(adminId) {
    return prisma.adminAuditLog.findMany({
      where: { adminId },
      orderBy: { createdAt: "desc" },
    });
  },

  async findManyByTarget(targetUserId) {
    return prisma.adminAuditLog.findMany({
      where: { targetUserId },
      orderBy: { createdAt: "desc" },
    });
  },
};
