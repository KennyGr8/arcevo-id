import { prisma } from "@database/prisma";
import type { SubscriptionPlan as SubscriptionPlanModel } from "@generated/prisma";
import type {
  CreateSubscriptionPlanInput,
  ISubscriptionPlanAdapter,
} from "./subscription-plan.adapter.interface";

export const subscriptionPlanAdapter: ISubscriptionPlanAdapter = {
  async create(data) {
    return prisma.subscriptionPlan.create({ data });
  },

  async findByName(name) {
    return prisma.subscriptionPlan.findUnique({
      where: { name },
    });
  },

  async findAllActive() {
    return prisma.subscriptionPlan.findMany({
      where: { isActive: true },
      orderBy: { priceAmount: "asc" },
    });
  },
};
