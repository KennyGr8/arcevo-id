import { db } from "@database";
import type { ISubscriptionAdapter } from "@interfaces/database";
import type { SubscriptionAdapter } from "@contracts/generated/types";

export const ConvexSubscriptionAdapter: ISubscriptionAdapter<SubscriptionAdapter> = {
  async findByUserId(userId) {
    return db.first("subscriptions", q => q.eq(q.field("userId"), userId));
  },
  async create(data) {
    const id = await db.insert("subscriptions", data);
    return { ...data, id };
  },
  async update(id, data) {
    await db.patch("subscriptions", id, data);
    return this.findByUserId(data.userId);
  },
  async cancel(id) {
    await db.patch("subscriptions", id, { status: "cancelled" });
  }
};
