import type { IMFAAdapter } from "@interfaces/database";
import type { MFAModel } from "@contracts/generated/types";
import {
  findById,
  findByUserId,
  insertInto,
  updateById,
  deleteById,
} from "@database/utils/neon-query";
import { neon } from "@database";

export const NeonMFAAdapter: IMFAAdapter<MFAModel> = {
  async findById(id) {
    return findById("mfa", id);
  },

  async findByUser(userId) {
    return findByUserId("mfa", userId).then(rows => rows[0] ?? null);
  },

  async create(data) {
    return insertInto("mfa", data);
  },

  async updateSecret(userId, secret) {
    const result = await neon.query(
      `UPDATE mfa SET secret = $1 WHERE "userId" = $2 RETURNING *`,
      [secret, userId]
    );
    return result.rows[0];
  },

  async enableMFA(userId) {
    const result = await neon.query(
      `UPDATE mfa SET enabled = true WHERE "userId" = $1 RETURNING *`,
      [userId]
    );
    return result.rows[0];
  },

  async disableMFA(userId) {
    await neon.query(`UPDATE mfa SET enabled = false WHERE "userId" = $1`, [userId]);
  },

  async delete(userId) {
    await neon.query(`DELETE FROM mfa WHERE "userId" = $1`, [userId]);
  },
};
