import { prisma } from "@database/prisma";
import type { SubscriptionProvider as SubscriptionProviderModel } from "@generated/prisma";
import type {
  CreateSubscriptionProviderInput,
  ISubscriptionProviderAdapter,
} from "./subscription-provider.adapter.interface";

export const subscriptionProviderAdapter: ISubscriptionProviderAdapter = {
  async create(data) {
    return prisma.subscriptionProvider.create({ data });
  },

  async findByName(name) {
    return prisma.subscriptionProvider.findUnique({
      where: { name },
    });
  },

  async findAll() {
    return prisma.subscriptionProvider.findMany();
  },
};
