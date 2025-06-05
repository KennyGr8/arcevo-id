import { prisma } from "@database/prisma";
import type { Subscription } from "@generated/prisma";
import type {
  CreateSubscriptionInput,
  UpdateSubscriptionInput,
  ISubscriptionAdapter,
} from "./subscription.adapter.interface";

export const subscriptionAdapter: ISubscriptionAdapter = {
  async create(data) {
    return prisma.subscription.create({ data });
  },

  async updateById(id, data) {
    return prisma.subscription.update({
      where: { id },
      data,
    });
  },

  async findByUserId(userId) {
    return prisma.subscription.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },

  async deleteByUserId(userId) {
    return prisma.subscription.deleteMany({ where: { userId } });
  },
};
