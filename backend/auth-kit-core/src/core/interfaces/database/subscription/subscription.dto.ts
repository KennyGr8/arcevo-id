import { SubscriptionStatus } from "@prisma-enums"

export type CreateSubscriptionDto = {
  userId: string;
  planId: string;
  status?: SubscriptionStatus;
  startDate?: Date;
  endDate?: Date;
  trialEndsAt?: Date | null;
  cancelAtPeriodEnd?: boolean;
  metadata?: Record<string, any>;
};

export type UpdateSubscriptionDto = Partial<{
  planId: string;
  status: SubscriptionStatus;
  endDate: Date | null;
  cancelAtPeriodEnd: boolean;
  trialEndsAt: Date | null;
  metadata: Record<string, any>;
}>;
