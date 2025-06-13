// Auto-generated from Prisma schema. Do not edit manually.

export enum TokenType {
  VERIFY_EMAIL = 'VERIFY_EMAIL',
  RESET_PASSWORD = 'RESET_PASSWORD',
  MAGIC_LINK = 'MAGIC_LINK',
  TOTP = 'TOTP',
}

export type TokenTypeValues =
  | 'VERIFY_EMAIL'
  | 'RESET_PASSWORD'
  | 'MAGIC_LINK'
  | 'TOTP';

// ✅ Type-safe helper (optional)
/**
 * Returns true if value is a valid TokenType enum value
 */
export function isTokenType(value: string): value is TokenTypeValues {
  return Object.values(TokenType).includes(value as TokenType);
}
