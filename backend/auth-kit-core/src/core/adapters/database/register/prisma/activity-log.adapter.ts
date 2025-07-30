import { prisma, ActivityLogModel } from "@database/logic";
import type { IActivityLogAdapter } from "@interfaces/database";

export const PrismaActivityLogAdapter: IActivityLogAdapter<ActivityLogModel> = {
  async findByUser(userId) {
    return prisma.activityLog.findMany({ where: { userId } });
  },
  async create(data) {
    return prisma.activityLog.create({ data });
  },
  async delete(id) {
    await prisma.activityLog.delete({ where: { id } });
  },
  async deleteAllForUser(userId) {
    await prisma.activityLog.deleteMany({ where: { userId } });
  }
};
