import * as DTO from "./organization-membership.dto";

export interface IOrganizationMembershipAdapter<TModel = unknown> {
  listMemberships(organizationId: string): Promise<TModel[]>;
  addMember(data: DTO.AddMemberDto): Promise<TModel>;
  removeMember(membershipId: string): Promise<boolean>;
  updateMemberRole(membershipId: string, role: DTO.UpdateMemberRoleDto): Promise<TModel>;
  getMembership(userId: string, organizationId: string): Promise<TModel | null>;
}
