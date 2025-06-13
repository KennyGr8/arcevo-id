// Auto-generated from Prisma schema. Do not edit manually.

export enum UserStatus {
  active = 'active',
  suspended = 'suspended',
  banned = 'banned',
}

export type UserStatusValues = 'active' | 'suspended' | 'banned';

// ✅ Type-safe helper (optional)
/**
 * Returns true if value is a valid UserStatus enum value
 */
export function isUserStatus(value: string): value is UserStatusValues {
  return Object.values(UserStatus).includes(value as UserStatus);
}
