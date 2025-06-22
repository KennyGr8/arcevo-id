import type { IAuthLogAdapter } from "@interfaces/database";
import type { AuthLogModel } from "@contracts/generated/types";
import { insertInto } from "@database/utils/neon-query";
import { neon } from "@database";

export const NeonAuthLogAdapter: IAuthLogAdapter<AuthLogModel> = {
  async create(data) {
    return insertInto("auth_log", data);
  },

  async findByUser(userId, limit = 20) {
    const { rows } = await neon.query(
      `SELECT * FROM "auth_log" WHERE "userId" = $1 ORDER BY "createdAt" DESC LIMIT $2`,
      [userId, limit]
    );
    return rows;
  },
};
