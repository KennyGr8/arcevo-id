import { prisma, EmailTokenModel } from "@database/logic";
import type { IEmailTokenAdapter } from "@interfaces/database";

export const PrismaEmailTokenAdapter: IEmailTokenAdapter<EmailTokenModel> = {
  async findByToken(token) {
    return prisma.emailToken.findUnique({ where: { token } });
  },
  async create(data) {
    return prisma.emailToken.create({ data });
  },
  async delete(id) {
    await prisma.emailToken.delete({ where: { id } });
  },
  async deleteExpired(now) {
    await prisma.emailToken.deleteMany({
      where: { expiresAt: { lt: now } },
    });
  }
};
