import { SubscriptionPlan } from "@prisma-enums";
import { SubscriptionPlan as SubscriptionPlanModel } from "@generated/prisma";

export interface CreateSubscriptionPlanInput {
  name: SubscriptionPlan;
  priceAmount: number;
  priceCurrency: string;
  description?: string;
  features?: string[];
  isActive?: boolean;
}

export interface ISubscriptionPlanAdapter {
  create(data: CreateSubscriptionPlanInput): Promise<SubscriptionPlanModel>;
  findByName(name: SubscriptionPlan): Promise<SubscriptionPlanModel | null>;
  findAllActive(): Promise<SubscriptionPlanModel[]>;
}
