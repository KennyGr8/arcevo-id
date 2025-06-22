// Auto-generated from Prisma schema. Do not edit manually. You can run or regenerate with pnpm generate:prisma-enums

export enum OAuthProvider {
  GITHUB = 'GITHUB',
  GOOGLE = 'GOOGLE',
  DISCORD = 'DISCORD',
}

export type OAuthProviderValues = 'GITHUB' | 'GOOGLE' | 'DISCORD';

// ✅ Type-safe helper (optional)
/**
 * Returns true if value is a valid OAuthProvider enum value
 */
export function isOAuthProvider(value: string): value is OAuthProviderValues {
  return Object.values(OAuthProvider).includes(value as OAuthProvider);
}
