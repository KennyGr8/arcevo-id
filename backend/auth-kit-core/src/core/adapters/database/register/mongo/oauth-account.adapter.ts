import { mongo } from "@database";
import type { IOAuthAccountAdapter } from "@interfaces/database";
import type { OAuthAccountDTO, OAuthAccountAdapter } from "@contracts/generated/types";

export const MongoOAuthAccountAdapter: IOAuthAccountAdapter<OAuthAccountAdapter> = {
  async createOAuthAccount(data) {
    await mongo.collection("oauth_accounts").insertOne(data);
    return data;
  },
  async getAccountByProvider(provider, providerUserId) {
    return mongo.collection<OAuthAccountAdapter>("oauth_accounts").findOne({ provider, providerUserId });
  },
  async getAllUserOAuthAccounts(userId) {
    return mongo.collection<OAuthAccountAdapter>("oauth_accounts").find({ userId }).toArray();
  },
  async deleteOAuthAccount(id) {
    const res = await mongo.collection("oauth_accounts").deleteOne({ id });
    return res.deletedCount === 1;
  }
};
