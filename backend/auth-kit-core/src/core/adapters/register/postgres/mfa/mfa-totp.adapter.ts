import { prisma } from "@database/prisma";
import type { Mfa } from "@generated/prisma";
import type {
  IMfaTotpAdapter,
  CreateMfaTotpInput,
  UpdateMfaTotpInput,
} from "./mfa-totp.adapter.interface";

export const mfaTotpAdapter: IMfaTotpAdapter = {
  async findByUserId(userId) {
    return prisma.mfa.findUnique({
      where: { userId },
    });
  },

  async create(data) {
    return prisma.mfa.create({
      data: {
        userId: data.userId,
        secret: data.secret,
        verified: data.verified ?? false,
        backupCodes: data.backupCodes ?? [],
      },
    });
  },

  async update(userId, data) {
    return prisma.mfa.update({
      where: { userId },
      data,
    });
  },

  async delete(userId) {
    await prisma.mfa.delete({
      where: { userId },
    });
  },
};
