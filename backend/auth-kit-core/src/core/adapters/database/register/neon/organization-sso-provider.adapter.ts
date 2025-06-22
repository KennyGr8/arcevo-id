import type { IOrganizationSSOProviderAdapter } from "@interfaces/database";
import type { OrganizationSSOProviderModel } from "@contracts/generated/types";
import {
  insertInto,
  findById,
} from "@database/utils/neon-query";
import { neon } from "@database";

export const NeonOrganizationSSOProviderAdapter: IOrganizationSSOProviderAdapter<OrganizationSSOProviderModel> = {
  async getByOrganization(organizationId) {
    const { rows } = await neon.query(
      `SELECT * FROM "organization_sso_provider" WHERE "organizationId" = $1`,
      [organizationId]
    );
    return rows;
  },

  async getById(id) {
    return findById("organization_sso_provider", id);
  },

  async create(data) {
    return insertInto("organization_sso_provider", data);
  },

  async delete(id) {
    const result = await neon.query(
      `DELETE FROM "organization_sso_provider" WHERE id = $1`,
      [id]
    );
    return result.rowCount > 0;
  },
};
