import { prisma } from "@database/prisma";
import type { IUserAdapter, CreateUserInput, UpdateUserInput } from "./user.adapter.interface";
import { Role, UserStatus } from "@prisma-enums";

export const userAdapter: IUserAdapter = {
  async findById(id) {
    return prisma.user.findUnique({ where: { id } });
  },

  async findByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
  },

  async create(data) {
    return prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role ?? Role.USER,
      },
    });
  },

  async update(id, data) {
    return prisma.user.update({
      where: { id },
      data,
    });
  },

  async delete(id) {
    await prisma.user.delete({ where: { id } });
  },

  async markEmailVerified(id, date = new Date()) {
    return prisma.user.update({
      where: { id },
      data: { emailVerified: date },
    });
  },

  async softDelete(id) {
    return prisma.user.update({
      where: { id },
      data: {
        isDeactivated: true,
        deletedAt: new Date(),
      },
    });
  },

  async setStatus(id, status) {
    return prisma.user.update({
      where: { id },
      data: { status },
    });
  },
};
