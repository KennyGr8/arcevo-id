// Auto-generated from Prisma schema. Do not edit manually.

export enum Web3OAuthProvider {
  METAMASK = 'METAMASK',
  BITCOIN = 'BITCOIN',
}

export type Web3OAuthProviderValues = 'METAMASK' | 'BITCOIN';

// ✅ Type-safe helper (optional)
/**
 * Returns true if value is a valid Web3OAuthProvider enum value
 */
export function isWeb3OAuthProvider(
  value: string,
): value is Web3OAuthProviderValues {
  return Object.values(Web3OAuthProvider).includes(value as Web3OAuthProvider);
}
