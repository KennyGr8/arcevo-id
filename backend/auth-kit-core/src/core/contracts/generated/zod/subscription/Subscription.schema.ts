import { z } from "zod";

export const SubscriptionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  user: z.any().optional(),
  plan: z.enum(["FREE", "PREMIUM", "PRO", "ENTERPRISE", "EDUCATOR"]),
  status: z.enum(["ACTIVE", "CANCELED", "TRIALING", "EXPIRED", "RENEWED"]),
  provider: z.enum(["STRIPE", "PAYSTACK", "LEMONSQUEEZY"]),
  stripeCustomerId: z.string().optional(),
  stripeSubId: z.string().optional(),
  paystackCustomerId: z.string().optional(),
  paystackSubCode: z.string().optional(),
  lemonCustomerId: z.string().optional(),
  lemonOrderId: z.string().optional(),
  currentPeriodEnd: z.coerce.date(),
  billingEvents: z.any().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
