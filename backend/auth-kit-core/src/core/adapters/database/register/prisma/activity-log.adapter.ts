import { prisma, ActivityLogModel } from "@database/prisma";
import type { IActivityLogAdapter } from "@interfaces/database";

export const ActivityLogAdapter: IActivityLogAdapter<ActivityLogModel> = {
  logActivity(data) {
    return prisma.activityLog.create({ data });
  },
  getUserActivity(userId, limit = 10) {
    return prisma.activityLog.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit
    });
  },
  getActivitiesByType(type) {
    return prisma.activityLog.findMany({ where: { type } });
  }
};
