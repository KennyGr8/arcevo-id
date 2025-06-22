import type { IBillingEventAdapter } from "@interfaces/database";
import type { BillingEventModel } from "@contracts/generated/types";
import { insertInto } from "@database/utils/neon-query";
import { neon } from "@database";

export const NeonBillingEventAdapter: IBillingEventAdapter<BillingEventModel> = {
  async create(data) {
    return insertInto("billing_event", data);
  },

  async findByUserId(userId) {
    const { rows } = await neon.query(
      `SELECT * FROM "billing_event" WHERE "userId" = $1 ORDER BY "createdAt" DESC`,
      [userId]
    );
    return rows;
  },

  async findBySubscriptionId(subscriptionId) {
    const { rows } = await neon.query(
      `SELECT * FROM "billing_event" WHERE "subscriptionId" = $1 ORDER BY "createdAt" DESC`,
      [subscriptionId]
    );
    return rows;
  },
};
