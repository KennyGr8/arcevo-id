import type { IActivityLogAdapter } from "@interfaces/database";
import type { ActivityLogModel } from "@contracts/generated/types";
import { insertInto } from "@database/utils/neon-query";
import { neon } from "@database";

export const NeonActivityLogAdapter: IActivityLogAdapter<ActivityLogModel> = {
  async logActivity(data) {
    return insertInto("activity_log", data);
  },

  async getUserActivity(userId, limit = 20) {
    const { rows } = await neon.query(
      `SELECT * FROM "activity_log" WHERE "userId" = $1 ORDER BY "createdAt" DESC LIMIT $2`,
      [userId, limit]
    );
    return rows;
  },

  async getActivitiesByType(type) {
    const { rows } = await neon.query(
      `SELECT * FROM "activity_log" WHERE type = $1 ORDER BY "createdAt" DESC`,
      [type]
    );
    return rows;
  },
};
