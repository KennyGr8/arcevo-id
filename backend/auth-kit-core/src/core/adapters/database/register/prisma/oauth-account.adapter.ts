import { prisma, OAuthAccountModel } from "@database/logic";
import type { IOAuthAdapter } from "@interfaces/database";

export const PrismaOAuthAdapter: IOAuthAdapter<OAuthAccountModel> = {
  async findByProvider(provider, providerAccountId) {
    return prisma.oAuthAccount.findUnique({
      where: {
        provider_providerAccountId: { provider, providerAccountId },
      },
    });
  },
  async create(data) {
    return prisma.oAuthAccount.create({ data });
  },
  async delete(id) {
    await prisma.oAuthAccount.delete({ where: { id } });
  },
  async findAllByUser(userId) {
    return prisma.oAuthAccount.findMany({ where: { userId } });
  }
};
