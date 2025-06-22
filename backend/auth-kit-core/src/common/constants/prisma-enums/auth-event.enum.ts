// Auto-generated from Prisma schema. Do not edit manually. You can run or regenerate with pnpm generate:prisma-enums

export enum AuthEvent {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  MFA_SUCCESS = 'MFA_SUCCESS',
  MFA_FAILED = 'MFA_FAILED',
  EMAIL_VERIFIED = 'EMAIL_VERIFIED',
  PASSWORD_CHANGED = 'PASSWORD_CHANGED',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
}

export type AuthEventValues =
  | 'LOGIN'
  | 'LOGOUT'
  | 'MFA_SUCCESS'
  | 'MFA_FAILED'
  | 'EMAIL_VERIFIED'
  | 'PASSWORD_CHANGED'
  | 'TOKEN_EXPIRED';

// ✅ Type-safe helper (optional)
/**
 * Returns true if value is a valid AuthEvent enum value
 */
export function isAuthEvent(value: string): value is AuthEventValues {
  return Object.values(AuthEvent).includes(value as AuthEvent);
}
