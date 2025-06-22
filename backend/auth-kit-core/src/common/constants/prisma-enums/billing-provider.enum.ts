// Auto-generated from Prisma schema. Do not edit manually. You can run or regenerate with pnpm generate:prisma-enums

export enum BillingProvider {
  STRIPE = 'STRIPE',
  PAYSTACK = 'PAYSTACK',
  LEMONSQUEEZY = 'LEMONSQUEEZY',
}

export type BillingProviderValues = 'STRIPE' | 'PAYSTACK' | 'LEMONSQUEEZY';

// ✅ Type-safe helper (optional)
/**
 * Returns true if value is a valid BillingProvider enum value
 */
export function isBillingProvider(
  value: string,
): value is BillingProviderValues {
  return Object.values(BillingProvider).includes(value as BillingProvider);
}
