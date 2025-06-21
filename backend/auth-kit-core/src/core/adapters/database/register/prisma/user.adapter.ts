import { prisma, UserModel } from "@database";
import * as DTO from "@contracts/generated/dto";
import type { IUserAdapter } from "@interfaces/database";

export const PrismaUserAdapter: IUserAdapter<UserModel> = {
  async findAll() {
    return prisma.user.findMany();
  },
  async findById(id) {
    return prisma.user.findUnique({ where: { id } });
  },
  async findByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
  },
  async create(data) {
    return prisma.user.create({ data });
  },
  async update(id, data) {
    return prisma.user.update({ where: { id }, data });
  },
  async delete(id) {
    await prisma.user.delete({ where: { id } });
  }
};
