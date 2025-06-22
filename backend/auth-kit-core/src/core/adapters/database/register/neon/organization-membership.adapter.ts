import type { IOrganizationMembershipAdapter } from "@interfaces/database";
import type { OrganizationMembershipModel } from "@contracts/generated/types";
import { insertInto } from "@database/utils/neon-query";
import { neon } from "@database";

export const NeonOrganizationMembershipAdapter: IOrganizationMembershipAdapter<OrganizationMembershipModel> = {
  async listMemberships(organizationId) {
    const { rows } = await neon.query(
      `SELECT * FROM "organization_membership" WHERE "organizationId" = $1`,
      [organizationId]
    );
    return rows;
  },

  async addMember(data) {
    return insertInto("organization_membership", data);
  },

  async removeMember(membershipId) {
    const result = await neon.query(
      `DELETE FROM "organization_membership" WHERE id = $1`,
      [membershipId]
    );
    return result.rowCount > 0;
  },

  async updateMemberRole(membershipId, { role }) {
    const { rows } = await neon.query(
      `UPDATE "organization_membership" SET role = $1 WHERE id = $2 RETURNING *`,
      [role, membershipId]
    );
    return rows[0];
  },

  async getMembership(userId, organizationId) {
    const { rows } = await neon.query(
      `SELECT * FROM "organization_membership" WHERE "userId" = $1 AND "organizationId" = $2`,
      [userId, organizationId]
    );
    return rows[0] ?? null;
  },
};
