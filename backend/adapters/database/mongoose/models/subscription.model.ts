import { Schema, model, type Document } from 'mongoose';
import { SubscriptionPlan, SubscriptionProvider, SubscriptionStatus } from '@prisma-enums';

export interface ISubscription extends Document {
  userId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  provider: SubscriptionProvider;

  stripeCustomerId?: string;
  stripeSubId?: string;

  paystackCustomerId?: string;
  paystackSubCode?: string;

  lemonCustomerId?: string;
  lemonOrderId?: string;

  currentPeriodEnd: Date;

  createdAt: Date;
  updatedAt: Date;
}

const subscriptionSchema = new Schema<ISubscription>(
  {
    userId: { type: String, required: true, unique: true },
    plan: { type: String, enum: Object.values(SubscriptionPlan), required: true },
    status: { type: String, enum: Object.values(SubscriptionStatus), required: true },
    provider: { type: String, enum: Object.values(SubscriptionProvider), required: true },

    stripeCustomerId: String,
    stripeSubId: String,
    paystackCustomerId: String,
    paystackSubCode: String,
    lemonCustomerId: String,
    lemonOrderId: String,

    currentPeriodEnd: { type: Date, required: true },
  },
  { timestamps: true }
);

export const SubscriptionModel = model<ISubscription>('Subscription', subscriptionSchema);
billing-event.model.ts