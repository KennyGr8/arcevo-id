import type { IOrganizationAdapter } from "@interfaces/database";
import type { OrganizationModel } from "@contracts/generated/types";
import {
  findById,
  insertInto,
  updateById,
} from "@database/utils/neon-query";
import { neon } from "@database";

export const NeonOrganizationAdapter: IOrganizationAdapter<OrganizationModel> = {
  async createOrganization(data) {
    return insertInto("organization", data);
  },

  async getOrganizationById(id) {
    return findById("organization", id);
  },

  async getOrganizationBySlug(slug) {
    const { rows } = await neon.query(
      `SELECT * FROM "organization" WHERE slug = $1`,
      [slug]
    );
    return rows[0] ?? null;
  },

  async updateOrganization(id, data) {
    return updateById("organization", id, data);
  },

  async deleteOrganization(id) {
    const result = await neon.query(
      `DELETE FROM "organization" WHERE id = $1`,
      [id]
    );
    return result.rowCount > 0;
  },

  async listOrganizations() {
    const { rows } = await neon.query(`SELECT * FROM "organization"`);
    return rows;
  },
};
