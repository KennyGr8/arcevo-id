// Auto-generated from Prisma schema. Do not edit manually.

export enum AdminAction {
  USER_BAN = 'USER_BAN',
  USER_UNBAN = 'USER_UNBAN',
  ACCOUNT_DELETED = 'ACCOUNT_DELETED',
}

export type AdminActionValues = 'USER_BAN' | 'USER_UNBAN' | 'ACCOUNT_DELETED';

// ✅ Type-safe helper (optional)
/**
 * Returns true if value is a valid AdminAction enum value
 */
export function isAdminAction(value: string): value is AdminActionValues {
  return Object.values(AdminAction).includes(value as AdminAction);
}
