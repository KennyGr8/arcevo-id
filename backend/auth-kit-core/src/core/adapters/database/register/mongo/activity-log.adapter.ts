import { mongo } from "@database";
import type { IActivityLogAdapter } from "@interfaces/database";
import type { ActivityLogDTO, ActivityLogAdapter } from "@contracts/generated/types";
import type { ActivityType } from "@prisma-enums";

export const MongoActivityLogAdapter: IActivityLogAdapter<ActivityLogAdapter> = {
  async logActivity(data) {
    await mongo.collection("activity_logs").insertOne(data);
    return data;
  },
  async getUserActivity(userId, limit = 10) {
    return mongo.collection<ActivityLogAdapter>("activity_logs")
      .find({ userId })
      .sort({ timestamp: -1 })
      .limit(limit)
      .toArray();
  },
  async getActivitiesByType(type: ActivityType) {
    return mongo.collection<ActivityLogAdapter>("activity_logs").find({ type }).toArray();
  }
};
