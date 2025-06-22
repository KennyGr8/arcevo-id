import type { IOrganizationInviteAdapter } from "@interfaces/database";
import type { OrganizationInviteModel } from "@contracts/generated/types";
import {
  findById,
  insertInto,
  deleteById,
} from "@database/utils/neon-query";
import { neon } from "@database";

export const NeonOrganizationInviteAdapter: IOrganizationInviteAdapter<OrganizationInviteModel> = {
  async create(data) {
    return insertInto("organization_invite", data);
  },

  async getById(id) {
    return findById("organization_invite", id);
  },

  async getByToken(token) {
    const { rows } = await neon.query(
      `SELECT * FROM "organization_invite" WHERE token = $1`,
      [token]
    );
    return rows[0] ?? null;
  },

  async getByEmail(email) {
    const { rows } = await neon.query(
      `SELECT * FROM "organization_invite" WHERE email = $1`,
      [email]
    );
    return rows;
  },

  async delete(id) {
    return deleteById("organization_invite", id);
  },
};
