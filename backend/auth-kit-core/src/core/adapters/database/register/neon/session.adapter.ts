import type { ISessionAdapter } from "@interfaces/database";
import type { SessionModel } from "@contracts/generated/types";
import {
  findById,
  insertInto,
  updateById,
  deleteById,
} from "@database/utils/neon-query";
import { neon } from "@database";

export const NeonSessionAdapter: ISessionAdapter<SessionModel> = {
  async findAllByUser(userId) {
    const { rows } = await neon.query(
      `SELECT * FROM "session" WHERE "userId" = $1 ORDER BY "createdAt" DESC`,
      [userId]
    );
    return rows;
  },

  async findById(id) {
    return findById("session", id);
  },

  async create(data) {
    return insertInto("session", data);
  },

  async update(id, data) {
    return updateById("session", id, data);
  },

  async delete(id) {
    return deleteById("session", id);
  },

  async revokeAll(userId) {
    const { rowCount } = await neon.query(
      `DELETE FROM "session" WHERE "userId" = $1`,
      [userId]
    );
    return rowCount ?? 0;
  },

  async revokeCurrent(id) {
    await deleteById("session", id);
  },
};
