import { db } from "@database";
import type { IBillingEventAdapter } from "@interfaces/database";
import type { BillingEventAdapter } from "@contracts/generated/types";

export const ConvexBillingEventAdapter: IBillingEventAdapter<BillingEventAdapter> = {
  async create(data) {
    const id = await db.insert("billing_events", data);
    return { ...data, id };
  },
  async findByUserId(userId) {
    return db.filter("billing_events", q => q.eq(q.field("userId"), userId));
  },
  async findBySubscriptionId(subscriptionId) {
    return db.filter("billing_events", q => q.eq(q.field("subscriptionId"), subscriptionId));
  }
};
