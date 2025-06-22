import { mongo } from "@database";
import type { IBillingEventAdapter } from "@interfaces/database";
import type { BillingEventDTO, BillingEventAdapter } from "@contracts/generated/types";

export const MongoBillingEventAdapter: IBillingEventAdapter<BillingEventAdapter> = {
  async create(data) {
    await mongo.collection("billing_events").insertOne(data);
    return data;
  },
  async findByUserId(userId) {
    return mongo.collection<BillingEventAdapter>("billing_events").find({ userId }).toArray();
  },
  async findBySubscriptionId(subscriptionId) {
    return mongo.collection<BillingEventAdapter>("billing_events").find({ subscriptionId }).toArray();
  }
};
