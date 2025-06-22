import type { ISubscriptionAdapter } from "@interfaces/database";
import type { SubscriptionModel } from "@contracts/generated/types";
import {
  findById,
  insertInto,
  updateById,
} from "@database/utils/neon-query";
import { neon } from "@database";

export const NeonSubscriptionAdapter: ISubscriptionAdapter<SubscriptionModel> = {
  async findByUserId(userId) {
    const { rows } = await neon.query(
      `SELECT * FROM "subscription" WHERE "userId" = $1`,
      [userId]
    );
    return rows[0] ?? null;
  },

  async create(data) {
    return insertInto("subscription", data);
  },

  async update(id, data) {
    return updateById("subscription", id, data);
  },

  async cancel(id) {
    await neon.query(`UPDATE "subscription" SET status = 'canceled' WHERE id = $1`, [id]);
  },
};
