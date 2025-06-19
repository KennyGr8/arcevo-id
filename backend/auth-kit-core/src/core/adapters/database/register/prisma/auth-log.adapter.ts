import type { IAuthLogAdapter } from "@interfaces/database";
import type { AuthLogAdapter } from "@contracts/generated/types";
import { prisma, AuthLogModel } from "@database";
import type { AuthEvent } from "@prisma-enums";
import DTO from "@modules/auth-log/auth-log.dto";

export class PrismaAuthLogAdapter implements IAuthLogAdapter<AuthLogAdapter> {
  async logEvent(data: DTO.CreateAuthLogDto): Promise<AuthLogAdapter> {
    const log = await prisma.authLog.create({ data });
    return this.toModel(log);
  }

  async getUserLogs(userId: string, limit = 10): Promise<AuthLogAdapter[]> {
    const logs = await prisma.authLog.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    return logs.map(this.toModel);
  }

  async getLogsByEvent(event: AuthEvent): Promise<AuthLogAdapter[]> {
    const logs = await prisma.authLog.findMany({ where: { event } });
    return logs.map(this.toModel);
  }

  private toModel(data: AuthLogModel): AuthLogAdapter {
    return {
      ...data,
    };
  }
}
