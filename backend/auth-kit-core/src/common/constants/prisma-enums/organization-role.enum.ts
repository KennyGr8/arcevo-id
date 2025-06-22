// Auto-generated from Prisma schema. Do not edit manually. You can run or regenerate with pnpm generate:prisma-enums

export enum OrganizationRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  GUEST = 'GUEST',
}

export type OrganizationRoleValues = 'OWNER' | 'ADMIN' | 'MEMBER' | 'GUEST';

// ✅ Type-safe helper (optional)
/**
 * Returns true if value is a valid OrganizationRole enum value
 */
export function isOrganizationRole(
  value: string,
): value is OrganizationRoleValues {
  return Object.values(OrganizationRole).includes(value as OrganizationRole);
}
