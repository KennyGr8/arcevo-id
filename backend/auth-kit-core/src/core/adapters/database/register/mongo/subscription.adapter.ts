import { mongo } from "@database";
import type { ISubscriptionAdapter } from "@interfaces/database";
import type { SubscriptionDTO, SubscriptionAdapter } from "@contracts/generated/types";

export const MongoSubscriptionAdapter: ISubscriptionAdapter<SubscriptionAdapter> = {
  async findByUserId(userId) {
    return mongo.collection<SubscriptionAdapter>("subscriptions").findOne({ userId });
  },
  async create(data) {
    await mongo.collection("subscriptions").insertOne(data);
    return data;
  },
  async update(id, data) {
    await mongo.collection("subscriptions").updateOne({ id }, { $set: data });
    return this.findByUserId(data.userId ?? "");
  },
  async cancel(id) {
    await mongo.collection("subscriptions").deleteOne({ id });
  }
};