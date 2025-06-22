import { db } from "@database";
import type { IAuthLogAdapter } from "@interfaces/database";
import type { AuthLogAdapter } from "@contracts/generated/types";

export const ConvexAuthLogAdapter: IAuthLogAdapter<AuthLogAdapter> = {
  async logAuthEvent(data) {
    const id = await db.insert("auth_logs", data);
    return { ...data, id };
  },
  async getLogsForUser(userId) {
    return db.filter("auth_logs", q => q.eq(q.field("userId"), userId));
  },
  async getByType(type) {
    return db.filter("auth_logs", q => q.eq(q.field("type"), type));
  }
};
