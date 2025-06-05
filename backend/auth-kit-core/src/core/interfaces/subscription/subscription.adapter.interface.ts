import { Subscription } from "@generated/prisma";
import { SubscriptionProvider, SubscriptionStatus, SubscriptionPlan } from "@prisma-enums";

export interface CreateSubscriptionInput {
  userId: string;
  provider: SubscriptionProvider;
  status: SubscriptionStatus;
  plan: SubscriptionPlan;
  priceAmount: number;
  priceCurrency: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd?: boolean;
  externalCustomerId?: string;
  externalSubscriptionId?: string;
}

export interface UpdateSubscriptionInput {
  status?: SubscriptionStatus;
  plan?: SubscriptionPlan;
  priceAmount?: number;
  priceCurrency?: string;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd?: boolean;
}

export interface ISubscriptionAdapter {
  create(data: CreateSubscriptionInput): Promise<Subscription>;
  updateById(id: string, data: UpdateSubscriptionInput): Promise<Subscription | null>;
  findByUserId(userId: string): Promise<Subscription | null>;
  deleteByUserId(userId: string): Promise<{ count: number }>;
}
