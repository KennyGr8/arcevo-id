import { prisma } from "@database/prisma";
import type { MfaWebAuthn } from "@generated/prisma";
import type {
  IMfaWebAuthnAdapter,
  CreateWebAuthnInput,
  UpdateWebAuthnInput,
} from "./mfa-webauthn.adapter.interface";

export const mfaWebAuthnAdapter: IMfaWebAuthnAdapter = {
  async findAllByUserId(userId) {
    return prisma.mfaWebAuthn.findMany({
      where: { userId },
    });
  },

  async findByCredentialId(credentialId) {
    return prisma.mfaWebAuthn.findUnique({
      where: { credentialId },
    });
  },

  async create(data) {
    return prisma.mfaWebAuthn.create({
      data: {
        userId: data.userId,
        credentialId: data.credentialId,
        publicKey: data.publicKey,
        counter: data.counter,
        deviceName: data.deviceName,
      },
    });
  },

  async update(credentialId, data) {
    return prisma.mfaWebAuthn.update({
      where: { credentialId },
      data,
    });
  },

  async delete(credentialId) {
    await prisma.mfaWebAuthn.delete({
      where: { credentialId },
    });
  },

  async deleteAll(userId) {
    return prisma.mfaWebAuthn.deleteMany({
      where: { userId },
    });
  },
};
