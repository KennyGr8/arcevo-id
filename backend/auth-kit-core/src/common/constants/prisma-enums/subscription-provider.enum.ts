// Auto-generated from Prisma schema. Do not edit manually. You can run or regenerate with pnpm generate:prisma-enums

export enum SubscriptionProvider {
  STRIPE = 'STRIPE',
  PAYSTACK = 'PAYSTACK',
  LEMONSQUEEZY = 'LEMONSQUEEZY',
}

export type SubscriptionProviderValues = 'STRIPE' | 'PAYSTACK' | 'LEMONSQUEEZY';

// ✅ Type-safe helper (optional)
/**
 * Returns true if value is a valid SubscriptionProvider enum value
 */
export function isSubscriptionProvider(
  value: string,
): value is SubscriptionProviderValues {
  return Object.values(SubscriptionProvider).includes(
    value as SubscriptionProvider,
  );
}
