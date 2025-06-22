import { db } from "@database";
import type { IOAuthAccountAdapter } from "@interfaces/database";
import type { OAuthAccountAdapter } from "@contracts/generated/types";
import type { OAuthProvider } from "@contracts/generated/dto/oauth-account.dto";

export const ConvexOAuthAccountAdapter: IOAuthAccountAdapter<OAuthAccountAdapter> = {
  async createOAuthAccount(data) {
    const id = await db.insert("oauth_accounts", data);
    return { ...data, id };
  },
  async getAccountByProvider(provider: OAuthProvider, providerUserId: string) {
    return db.first("oauth_accounts", q =>
      q.and(
        q.eq(q.field("provider"), provider),
        q.eq(q.field("providerUserId"), providerUserId)
      )
    );
  },
  async getAllUserOAuthAccounts(userId) {
    return db.filter("oauth_accounts", q => q.eq(q.field("userId"), userId));
  },
  async deleteOAuthAccount(id) {
    await db.delete("oauth_accounts", id);
    return true;
  }
};
