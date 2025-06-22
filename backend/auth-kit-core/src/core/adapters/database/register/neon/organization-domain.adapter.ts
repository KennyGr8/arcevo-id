import type { IOrganizationDomainAdapter } from "@interfaces/database";
import type { OrganizationDomainModel } from "@contracts/generated/types";
import {
  insertInto,
  findById,
} from "@database/utils/neon-query";
import { neon } from "@database";

export const NeonOrganizationDomainAdapter: IOrganizationDomainAdapter<OrganizationDomainModel> = {
  async createDomain(data) {
    return insertInto("organization_domain", data);
  },

  async verifyDomain(id) {
    const { rows } = await neon.query(
      `UPDATE "organization_domain" SET verified = true WHERE id = $1 RETURNING *`,
      [id]
    );
    return rows[0];
  },

  async getDomainById(id) {
    return findById("organization_domain", id);
  },

  async getDomainByValue(domain) {
    const { rows } = await neon.query(
      `SELECT * FROM "organization_domain" WHERE domain = $1`,
      [domain]
    );
    return rows[0] ?? null;
  },

  async listDomainsForOrganization(orgId) {
    const { rows } = await neon.query(
      `SELECT * FROM "organization_domain" WHERE "organizationId" = $1`,
      [orgId]
    );
    return rows;
  },

  async deleteDomain(id) {
    const result = await neon.query(
      `DELETE FROM "organization_domain" WHERE id = $1`,
      [id]
    );
    return result.rowCount > 0;
  },
};
