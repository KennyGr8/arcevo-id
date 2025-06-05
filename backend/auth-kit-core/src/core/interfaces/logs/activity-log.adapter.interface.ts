import { ActivityLog } from "@generated/prisma";
import { ActivityType } from "@prisma-enums";

export interface CreateActivityLogInput {
  userId: string;
  type: ActivityType;
  description?: string;
  ip?: string;
  userAgent?: string;
  location?: string;
  metadata?: Record<string, any>;
}

export interface IActivityLogAdapter {
  create(data: CreateActivityLogInput): Promise<ActivityLog>;
  findManyByUserId(userId: string): Promise<ActivityLog[]>;
  deleteManyByUserId(userId: string): Promise<{ count: number }>;
}
