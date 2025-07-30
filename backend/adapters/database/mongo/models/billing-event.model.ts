import { Schema, model, type Document } from 'mongoose';
import { BillingEventType, SubscriptionProvider } from '@prisma-enums';

export interface IBillingEvent extends Document {
  userId: string;
  subscriptionId: string;
  eventType: BillingEventType;
  provider: SubscriptionProvider;
  status?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

const billingEventSchema = new Schema<IBillingEvent>(
  {
    userId: { type: String, required: true },
    subscriptionId: { type: String, required: true },
    eventType: { type: String, enum: Object.values(BillingEventType), required: true },
    provider: { type: String, enum: Object.values(SubscriptionProvider), required: true },
    status: String,
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const BillingEventModel = model<IBillingEvent>('BillingEvent', billingEventSchema);
