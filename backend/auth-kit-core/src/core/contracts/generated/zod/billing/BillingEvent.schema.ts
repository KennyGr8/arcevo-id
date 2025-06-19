import { z } from "zod";

export const BillingEventSchema = z.object({
  id: z.string(),
  userId: z.string(),
  user: z.any().optional(),
  subscriptionId: z.string(),
  subscription: z.any().optional(),
  eventType: z.enum([
    "SUBSCRIPTION_CREATED",
    "SUBSCRIPTION_UPDATED",
    "SUBSCRIPTION_CANCELED",
    "PAYMENT_SUCCEEDED",
    "PAYMENT_FAILED",
    "TRIAL_STARTED",
    "TRIAL_ENDED",
    "REFUND_INITIATED",
    "COUPON_APPLIED",
    "PLAN_SWITCHED",
    "RENEWAL",
    "PROVIDER_SYNC",
  ]),
  provider: z.enum(["STRIPE", "PAYSTACK", "LEMONSQUEEZY"]),
  status: z.string().optional(),
  metadata: z.any().optional(),
  createdAt: z.coerce.date(),
});
