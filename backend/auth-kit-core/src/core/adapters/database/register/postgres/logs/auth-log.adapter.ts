import { prisma } from "@database/prisma";
import type { AuthLog } from "@generated/prisma";
import type { CreateAuthLogInput, IAuthLogAdapter } from "./auth-log.adapter.interface";

export const authLogAdapter: IAuthLogAdapter = {
  async create(data) {
    return prisma.authLog.create({
      data,
    });
  },

  async findManyByUserId(userId) {
    return prisma.authLog.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },

  async deleteManyByUserId(userId) {
    return prisma.authLog.deleteMany({
      where: { userId },
    });
  },
};
