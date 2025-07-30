import { prisma, SubscriptionModel } from "@database/logic";
import type { ISubscriptionAdapter } from "@interfaces/database";

export const PrismaSubscriptionAdapter: ISubscriptionAdapter<SubscriptionModel> = {
  async findByUser(userId) {
    return prisma.subscription.findFirst({ where: { userId } });
  },
  async create(data) {
    return prisma.subscription.create({ data });
  },
  async update(id, data) {
    return prisma.subscription.update({ where: { id }, data });
  },
  async cancel(id) {
    return prisma.subscription.update({
      where: { id },
      data: { status: "CANCELLED" },
    });
  }
};
