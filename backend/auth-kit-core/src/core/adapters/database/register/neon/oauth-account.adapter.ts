import type { IOAuthAccountAdapter } from "@interfaces/database";
import type { OAuthAccountModel } from "@contracts/generated/types";
import { insertInto } from "@database/utils/neon-query";
import { neon } from "@database";

export const NeonOAuthAccountAdapter: IOAuthAccountAdapter<OAuthAccountModel> = {
  async createOAuthAccount(data) {
    return insertInto("oauth_account", data);
  },

  async getAccountByProvider(provider, providerUserId) {
    const { rows } = await neon.query(
      `SELECT * FROM "oauth_account" WHERE provider = $1 AND "providerUserId" = $2`,
      [provider, providerUserId]
    );
    return rows[0] ?? null;
  },

  async getAllUserOAuthAccounts(userId) {
    const { rows } = await neon.query(
      `SELECT * FROM "oauth_account" WHERE "userId" = $1`,
      [userId]
    );
    return rows;
  },

  async deleteOAuthAccount(id) {
    const result = await neon.query(
      `DELETE FROM "oauth_account" WHERE id = $1`,
      [id]
    );
    return result.rowCount > 0;
  },
};
