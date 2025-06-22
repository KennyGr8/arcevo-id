import { db } from "@database";
import type { IOrganizationMembershipAdapter } from "@interfaces/database";
import type { OrganizationMembershipAdapter } from "@contracts/generated/types";

export const ConvexOrganizationMembershipAdapter: IOrganizationMembershipAdapter<OrganizationMembershipAdapter> = {
  async listMemberships(organizationId) {
    return db.filter("organization_memberships", q => q.eq(q.field("organizationId"), organizationId));
  },
  async addMember(data) {
    const id = await db.insert("organization_memberships", data);
    return { ...data, id };
  },
  async removeMember(membershipId) {
    await db.delete("organization_memberships", membershipId);
    return true;
  },
  async updateMemberRole(membershipId, role) {
    await db.patch("organization_memberships", membershipId, { role });
    return db.get("organization_memberships", membershipId);
  },
  async getMembership(userId, organizationId) {
    return db.first("organization_memberships", q =>
      q.and(
        q.eq(q.field("userId"), userId),
        q.eq(q.field("organizationId"), organizationId)
      )
    );
  }
};
