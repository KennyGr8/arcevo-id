// Auto-generated from Prisma schema. Do not edit manually.

export enum SocialOAuthProvider {
  FACEBOOK = 'FACEBOOK',
  LINKEDIN = 'LINKEDIN',
}

export type SocialOAuthProviderValues = 'FACEBOOK' | 'LINKEDIN';

// ✅ Type-safe helper (optional)
/**
 * Returns true if value is a valid SocialOAuthProvider enum value
 */
export function isSocialOAuthProvider(
  value: string,
): value is SocialOAuthProviderValues {
  return Object.values(SocialOAuthProvider).includes(
    value as SocialOAuthProvider,
  );
}
