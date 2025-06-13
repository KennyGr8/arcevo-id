import { prisma } from "@database/prisma";
import type { ActivityLog } from "@generated/prisma";
import type {
  CreateActivityLogInput,
  IActivityLogAdapter,
} from "./activity-log.adapter.interface";

export const activityLogAdapter: IActivityLogAdapter = {
  async create(data) {
    return prisma.activityLog.create({
      data,
    });
  },

  async findManyByUserId(userId) {
    return prisma.activityLog.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },

  async deleteManyByUserId(userId) {
    return prisma.activityLog.deleteMany({
      where: { userId },
    });
  },
};
