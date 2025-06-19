import type { ActivityType } from "@prisma-enums";

export type CreateActivityLogDto = {
  userId: string;
  action: ActivityType;
  ip?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
};