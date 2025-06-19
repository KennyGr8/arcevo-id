// Auto-generated from Prisma schema. Do not edit manually.

export enum ActivityType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  MFA_ENABLED = 'MFA_ENABLED',
  PASSWORD_RESET = 'PASSWORD_RESET',
}

export type ActivityTypeValues =
  | 'LOGIN'
  | 'LOGOUT'
  | 'MFA_ENABLED'
  | 'PASSWORD_RESET';

// ✅ Type-safe helper (optional)
/**
 * Returns true if value is a valid ActivityType enum value
 */
export function isActivityType(value: string): value is ActivityTypeValues {
  return Object.values(ActivityType).includes(value as ActivityType);
}
