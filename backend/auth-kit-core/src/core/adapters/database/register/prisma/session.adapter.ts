import type { ISessionAdapter } from "@interfaces/database";
import type { SessionAdapter } from "@contracts/generated/types";
import { prisma } from "@database";
import type { SessionModel } from "@database/prisma";

export class PrismaSessionAdapter implements ISessionAdapter<SessionAdapter> {
  async findAllByUser(userId: string): Promise<SessionAdapter[]> {
    const sessions = await prisma.session.findMany({ where: { userId } });
    return sessions.map(this.toModel);
  }

  async findById(id: string): Promise<SessionAdapter | null> {
    const session = await prisma.session.findUnique({ where: { id } });
    return session ? this.toModel(session) : null;
  }

  async delete(id: string): Promise<boolean> {
    await prisma.session.delete({ where: { id } });
    return true;
  }

  private toModel(session: SessionModel): SessionAdapter {
    return {
      id: session.id,
      userId: session.userId,
      ip: session.ip,
      userAgent: session.userAgent,
      createdAt: session.createdAt,
      expiresAt: session.expiresAt,
      valid: session.valid,
      lastActiveAt: session.lastActiveAt,
      deviceName: session.deviceName,
      browser: session.browser,
      platform: session.platform,
      location: session.location,
    };
  }
}
