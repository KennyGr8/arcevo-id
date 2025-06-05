import { prisma } from "@database";

export async function logActivity(
  userId: string,
  action: string,
  metadata?: {
    ip?: string;
    userAgent?: string;
    [key: string]: any;
  }
) {
  return prisma.activityLog.create({
    data: {
      userId,
      action,
      metadata,
      ip: metadata?.ip,
      userAgent: metadata?.userAgent,
    },
  });
}
