import { mongo } from "@database";
import type { IOrganizationMembershipAdapter } from "@interfaces/database";
import type { OrganizationMembershipDTO, OrganizationMembershipAdapter } from "@contracts/generated/types";

export const MongoOrganizationMembershipAdapter: IOrganizationMembershipAdapter<OrganizationMembershipAdapter> = {
  async listMemberships(organizationId) {
    return mongo.collection<OrganizationMembershipAdapter>("organization_memberships").find({ organizationId }).toArray();
  },
  async addMember(data) {
    await mongo.collection("organization_memberships").insertOne(data);
    return data;
  },
  async removeMember(membershipId) {
    const res = await mongo.collection("organization_memberships").deleteOne({ id: membershipId });
    return res.deletedCount === 1;
  },
  async updateMemberRole(membershipId, role) {
    await mongo.collection("organization_memberships").updateOne({ id: membershipId }, { $set: { role: role.role } });
    return this.getMembership(role.userId, role.organizationId);
  },
  async getMembership(userId, organizationId) {
    return mongo.collection<OrganizationMembershipAdapter>("organization_memberships").findOne({ userId, organizationId });
  }
};
