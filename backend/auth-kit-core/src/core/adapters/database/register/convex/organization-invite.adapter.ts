import { db } from "@database";
import type { IOrganizationInviteAdapter } from "@interfaces/database";
import type { OrganizationInviteAdapter } from "@contracts/generated/types";

export const ConvexOrganizationInviteAdapter: IOrganizationInviteAdapter<OrganizationInviteAdapter> = {
  async createInvite(data) {
    const id = await db.insert("organization_invites", data);
    return { ...data, id };
  },
  async getInviteById(id) {
    return db.get("organization_invites", id);
  },
  async getInvitesByOrg(orgId) {
    return db.filter("organization_invites", q => q.eq(q.field("organizationId"), orgId));
  },
  async deleteInvite(id) {
    await db.delete("organization_invites", id);
    return true;
  }
};
