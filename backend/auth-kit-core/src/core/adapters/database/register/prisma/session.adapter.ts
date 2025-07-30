import { prisma, SessionModel } from "@database/logic";
import type { ISessionAdapter } from "@interfaces/database";

export const PrismaSessionAdapter: ISessionAdapter<SessionModel> = {
  async findAllByUser(userId) {
    return prisma.session.findMany({ where: { userId } });
  },
  async findById(id) {
    return prisma.session.findUnique({ where: { id } });
  },
  async create(data) {
    return prisma.session.create({ data });
  },
  async update(id, data) {
    return prisma.session.update({ where: { id }, data });
  },
  async delete(id) {
    await prisma.session.delete({ where: { id } });
  },
  async revokeAll(userId) {
    await prisma.session.updateMany({
      where: { userId },
      data: { valid: false },
    });
  },
	async revokeCurrent(userId) {
		await prisma.session.update({
			where: { userId },
			data: { valid: false },
		});
	}
};
