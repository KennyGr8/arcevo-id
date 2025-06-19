// Auto-generated from Prisma schema. Do not edit manually.

export enum BillingEventType {
  SUBSCRIPTION_CREATED = 'SUBSCRIPTION_CREATED',
  SUBSCRIPTION_UPDATED = 'SUBSCRIPTION_UPDATED',
  SUBSCRIPTION_CANCELED = 'SUBSCRIPTION_CANCELED',
  PAYMENT_SUCCEEDED = 'PAYMENT_SUCCEEDED',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  TRIAL_STARTED = 'TRIAL_STARTED',
  TRIAL_ENDED = 'TRIAL_ENDED',
  REFUND_INITIATED = 'REFUND_INITIATED',
  COUPON_APPLIED = 'COUPON_APPLIED',
  PLAN_SWITCHED = 'PLAN_SWITCHED',
  RENEWAL = 'RENEWAL',
  PROVIDER_SYNC = 'PROVIDER_SYNC',
}

export type BillingEventTypeValues =
  | 'SUBSCRIPTION_CREATED'
  | 'SUBSCRIPTION_UPDATED'
  | 'SUBSCRIPTION_CANCELED'
  | 'PAYMENT_SUCCEEDED'
  | 'PAYMENT_FAILED'
  | 'TRIAL_STARTED'
  | 'TRIAL_ENDED'
  | 'REFUND_INITIATED'
  | 'COUPON_APPLIED'
  | 'PLAN_SWITCHED'
  | 'RENEWAL'
  | 'PROVIDER_SYNC';

// ✅ Type-safe helper (optional)
/**
 * Returns true if value is a valid BillingEventType enum value
 */
export function isBillingEventType(
  value: string,
): value is BillingEventTypeValues {
  return Object.values(BillingEventType).includes(value as BillingEventType);
}
