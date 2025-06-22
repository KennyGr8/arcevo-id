import { OrganizationRole } from "@prisma-enums";

export type CreateOrganizationInviteDto = {
  id: string;
  email: string;
  organizationId: string;
  inviterId: string;
  role?: OrganizationRole;
  expiresAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};
