import { Session } from "@generated/prisma";
import { prisma } from "@database/prisma";
import type { ISessionAdapter, CreateSessionInput, UpdateSessionInput } from "./session.adapter.interface";

export const sessionAdapter: ISessionAdapter = {
  async findById(id) {
    return prisma.session.findUnique({ where: { id } });
  },

  async findAllByUserId(userId) {
    return prisma.session.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },

  async create(data) {
    return prisma.session.create({
      data: {
        userId: data.userId,
        ip: data.ip,
        userAgent: data.userAgent,
        refreshToken: data.refreshToken,
        expiresAt: data.expiresAt,
        deviceName: data.deviceName,
        platform: data.platform,
        browser: data.browser,
        location: data.location,
      },
    });
  },

  async update(id, data) {
    return prisma.session.update({
      where: { id },
      data,
    });
  },

  async revoke(id) {
    return prisma.session.update({
      where: { id },
      data: { valid: false },
    });
  },

  async revokeAll(userId) {
    return prisma.session.updateMany({
      where: { userId },
      data: { valid: false },
    });
  },

  async delete(id) {
    await prisma.session.delete({ where: { id } });
  },
};
