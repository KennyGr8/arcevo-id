// Auto-generated from Prisma schema. Do not edit manually.

export enum AdminAction {
  USER_BAN = 'USER_BAN',
  USER_UNBAN = 'USER_UNBAN',
  ACCOUNT_DELETED = 'ACCOUNT_DELETED',
  ORG_CREATED = 'ORG_CREATED',
  ORG_MEMBER_REMOVED = 'ORG_MEMBER_REMOVED',
  ORG_INVITE_SENT = 'ORG_INVITE_SENT',
  SUBSCRIPTION_UPDATED = 'SUBSCRIPTION_UPDATED',
}

export type AdminActionValues =
  | 'USER_BAN'
  | 'USER_UNBAN'
  | 'ACCOUNT_DELETED'
  | 'ORG_CREATED'
  | 'ORG_MEMBER_REMOVED'
  | 'ORG_INVITE_SENT'
  | 'SUBSCRIPTION_UPDATED';

// ✅ Type-safe helper (optional)
/**
 * Returns true if value is a valid AdminAction enum value
 */
export function isAdminAction(value: string): value is AdminActionValues {
  return Object.values(AdminAction).includes(value as AdminAction);
}
