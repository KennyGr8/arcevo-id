import { prisma, MFABackupCodeModel } from "@database/logic";
import type { IMFABackupCodeAdapter } from "@interfaces/database";

export const PrismaMFABackupCodeAdapter: IMFABackupCodeAdapter<MFABackupCodeModel> = {
  async findByUser(userId) {
    return prisma.mfaBackupCode.findMany({ where: { userId } });
  },
  async createMany(data) {
    return prisma.mfaBackupCode.createMany({ data });
  },
  async deleteAll(userId) {
    await prisma.mfaBackupCode.deleteMany({ where: { userId } });
  },
  async markUsed(id) {
    return prisma.mfaBackupCode.update({
      where: { id },
      data: { used: true },
    });
  }
};
