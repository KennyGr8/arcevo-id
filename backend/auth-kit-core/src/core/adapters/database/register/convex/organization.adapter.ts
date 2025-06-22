import { db } from "@database";
import type { IOrganizationAdapter } from "@interfaces/database";
import type { OrganizationAdapter } from "@contracts/generated/types";

export const ConvexOrganizationAdapter: IOrganizationAdapter<OrganizationAdapter> = {
  async createOrganization(data) {
    const id = await db.insert("organizations", data);
    return { ...data, id };
  },
  async getOrganizationById(id) {
    return db.get("organizations", id);
  },
  async getOrganizationBySlug(slug) {
    return db.first("organizations", q => q.eq(q.field("slug"), slug));
  },
  async updateOrganization(id, data) {
    await db.patch("organizations", id, data);
    return this.getOrganizationById(id);
  },
  async deleteOrganization(id) {
    await db.delete("organizations", id);
    return true;
  },
  async listOrganizations() {
    return db.query("organizations");
  }
};
