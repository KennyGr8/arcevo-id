import { mongo } from "@database";
import type { IMFAAdapter } from "@interfaces/database";
import type { MFADTO, MFAAdapter } from "@contracts/generated/types";

export const MongoMFAAdapter: IMFAAdapter<MFAAdapter> = {
  async create(data) {
    await mongo.collection("mfa").insertOne(data);
    return data;
  },
  async findByUser(userId) {
    return mongo.collection<MFAAdapter>("mfa").findOne({ userId });
  },
  async findById(id) {
    return mongo.collection<MFAAdapter>("mfa").findOne({ id });
  },
  async updateSecret(userId, secret) {
    await mongo.collection("mfa").updateOne({ userId }, { $set: { secret } });
    return this.findByUser(userId);
  },
  async enableMFA(userId) {
    await mongo.collection("mfa").updateOne({ userId }, { $set: { enabled: true } });
    return this.findByUser(userId);
  },
  async disableMFA(userId) {
    await mongo.collection("mfa").deleteOne({ userId });
  },
  async delete(userId) {
    await mongo.collection("mfa").deleteOne({ userId });
  }
};