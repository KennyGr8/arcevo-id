import { prisma, AuthLogModel } from "@database/logic";
import type { IAuthLogAdapter } from "@interfaces/database";

export const PrismaAuthLogAdapter: IAuthLogAdapter<AuthLogModel> = {
  async findByUser(userId) {
    return prisma.authLog.findMany({ where: { userId } });
  },
  async findById(id) {
    return prisma.authLog.findUnique({ where: { id } });
  },
  async create(data) {
    return prisma.authLog.create({ data });
  },
  async delete(id) {
    await prisma.authLog.delete({ where: { id } });
  },
  async deleteAllForUser(userId) {
    await prisma.authLog.deleteMany({ where: { userId } });
  }
};
