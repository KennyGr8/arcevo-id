import { db } from "@database";
import type { IActivityLogAdapter } from "@interfaces/database";
import type { ActivityLogAdapter } from "@contracts/generated/types";

export const ConvexActivityLogAdapter: IActivityLogAdapter<ActivityLogAdapter> = {
  async logActivity(data) {
    const id = await db.insert("activity_logs", data);
    return { ...data, id };
  },
  async getUserActivity(userId, limit = 10) {
    const all = await db.filter("activity_logs", q => q.eq(q.field("userId"), userId));
    return all.slice(0, limit);
  },
  async getActivitiesByType(type) {
    return db.filter("activity_logs", q => q.eq(q.field("type"), type));
  }
};
