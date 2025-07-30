import { prisma, MFAModel } from "@database/logic";
import type { IMFAAdapter } from "@interfaces/database";

export const PrismaMFAAdapter: IMFAAdapter<MFAModel> = {
  async findByUser(userId) {
    return prisma.mfa.findMany({ where: { userId } });
  },
  async findById(id) {
    return prisma.mfa.findUnique({ where: { id } });
  },
  async create(data) {
    return prisma.mfa.create({ data });
  },
  async update(id, data) {
    return prisma.mfa.update({ where: { id }, data });
  },
  async delete(id) {
    await prisma.mfa.delete({ where: { id } });
  },
  async deleteAllForUser(userId) {
    await prisma.mfa.deleteMany({ where: { userId } });
  }
};
