import { prisma, AdminAuditLogModel } from "@database/prisma";
import type { IAdminAuditLogAdapter } from "@interfaces/database/admin-audit-log.interface.adapter";

export const AdminAuditLogAdapter: IAdminAuditLogAdapter<AdminAuditLogModel> = {
  findAll() {
    return prisma.adminAuditLog.findMany();
  },
  findById(id) {
    return prisma.adminAuditLog.findUnique({ where: { id } });
  },
  create(data) {
    return prisma.adminAuditLog.create({ data });
  },
  update(id, data) {
    return prisma.adminAuditLog.update({ where: { id }, data });
  },
  delete(id) {
    return prisma.adminAuditLog.delete({ where: { id } }).then(() => {});
  }
};
