import { prisma, AdminAuditLogModel } from "@database/logic";
import type { IAdminAuditLogAdapter } from "@interfaces/database";

export const PrismaAdminAuditLogAdapter: IAdminAuditLogAdapter<AdminAuditLogModel> = {
  async findAll() {
    return prisma.adminAuditLog.findMany();
  },
  async findById(id) {
    return prisma.adminAuditLog.findUnique({ where: { id } });
  },
  async create(data) {
    return prisma.adminAuditLog.create({ data });
  },
  async delete(id) {
    await prisma.adminAuditLog.delete({ where: { id } });
  }
};
