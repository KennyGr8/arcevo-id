// Auto-generated from Prisma schema. Do not edit manually.

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  TRIALING = 'TRIALING',
  EXPIRED = 'EXPIRED',
  RENEWED = 'RENEWED',
}

export type SubscriptionStatusValues =
  | 'ACTIVE'
  | 'CANCELED'
  | 'TRIALING'
  | 'EXPIRED'
  | 'RENEWED';

// ✅ Type-safe helper (optional)
/**
 * Returns true if value is a valid SubscriptionStatus enum value
 */
export function isSubscriptionStatus(
  value: string,
): value is SubscriptionStatusValues {
  return Object.values(SubscriptionStatus).includes(
    value as SubscriptionStatus,
  );
}
