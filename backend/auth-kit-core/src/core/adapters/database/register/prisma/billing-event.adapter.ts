import { prisma, BillingEventModel } from "@database";
import * as DTO from "@contracts/generated/dto";
import type { IBillingEventAdapter } from "@interfaces/database";

export const PrismaBillingEventAdapter: IBillingEventAdapter<BillingEventModel> = {
  async findAllByUser(userId) {
    return prisma.billingEvent.findMany({ where: { userId } });
  },
  async create(data) {
    return prisma.billingEvent.create({ data });
  }
};
