// Auto-generated from Prisma schema. Do not edit manually.

export enum Role {
  USER = 'USER',
  PREMIUM = 'PREMIUM',
  PRO = 'PRO',
  ADMIN = 'ADMIN',
}

export type RoleValues = 'USER' | 'PREMIUM' | 'PRO' | 'ADMIN';

// ✅ Type-safe helper (optional)
/**
 * Returns true if value is a valid Role enum value
 */
export function isRole(value: string): value is RoleValues {
  return Object.values(Role).includes(value as Role);
}
