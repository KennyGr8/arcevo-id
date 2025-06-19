import type { OrganizationRole } from "@prisma-enums";

export type AddMemberDto = {
  userId: string;
  organizationId: string;
  role?: OrganizationRole;
  invitedById?: string;
};

export type UpdateMemberRoleDto = {
  role: OrganizationRole;
};
