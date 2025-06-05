import { SubscriptionProvider } from "@prisma-enums";
import { SubscriptionProvider as SubscriptionProviderModel } from "@generated/prisma";

export interface CreateSubscriptionProviderInput {
  name: SubscriptionProvider;
  webhookSecret?: string;
  isActive?: boolean;
}

export interface ISubscriptionProviderAdapter {
  create(data: CreateSubscriptionProviderInput): Promise<SubscriptionProviderModel>;
  findByName(name: SubscriptionProvider): Promise<SubscriptionProviderModel | null>;
  findAll(): Promise<SubscriptionProviderModel[]>;
}
