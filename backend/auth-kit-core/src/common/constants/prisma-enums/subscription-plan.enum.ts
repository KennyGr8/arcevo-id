// Auto-generated from Prisma schema. Do not edit manually.

export enum SubscriptionPlan {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
  PRO = 'PRO',
  ENTERPRISE = 'ENTERPRISE',
}

export type SubscriptionPlanValues = 'FREE' | 'PREMIUM' | 'PRO' | 'ENTERPRISE';

// ✅ Type-safe helper (optional)
/**
 * Returns true if value is a valid SubscriptionPlan enum value
 */
export function isSubscriptionPlan(
  value: string,
): value is SubscriptionPlanValues {
  return Object.values(SubscriptionPlan).includes(value as SubscriptionPlan);
}
