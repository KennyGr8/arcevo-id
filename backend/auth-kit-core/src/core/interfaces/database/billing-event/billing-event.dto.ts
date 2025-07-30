import { BillingEventType, SubscriptionProvider } from "@constants/prisma-enums";

export type CreateBillingEventDto = {
  userId: string;
  subscriptionId: string;
  eventType: BillingEventType;
  provider: SubscriptionProvider;
  status?: string;
  metadata?: Record<string, any>;
}
