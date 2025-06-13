// Auto-generated from Prisma schema. Do not edit manually.

export enum AuthEvent {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  MFA_SUCCESS = 'MFA_SUCCESS',
  MFA_FAILED = 'MFA_FAILED',
}

export type AuthEventValues = 'LOGIN' | 'LOGOUT' | 'MFA_SUCCESS' | 'MFA_FAILED';

// ✅ Type-safe helper (optional)
/**
 * Returns true if value is a valid AuthEvent enum value
 */
export function isAuthEvent(value: string): value is AuthEventValues {
  return Object.values(AuthEvent).includes(value as AuthEvent);
}
