import { db } from "@database";
import type { IOrganizationSSOProviderAdapter } from "@interfaces/database";
import type { OrganizationSSOProviderAdapter } from "@contracts/generated/types";

export const ConvexOrganizationSSOProviderAdapter: IOrganizationSSOProviderAdapter<OrganizationSSOProviderAdapter> = {
  async getByOrganization(organizationId) {
    return db.filter("organization_sso_providers", q => q.eq(q.field("organizationId"), organizationId));
  },
  async getById(id) {
    return db.get("organization_sso_providers", id);
  },
  async create(data) {
    const id = await db.insert("organization_sso_providers", data);
    return { ...data, id };
  },
  async delete(id) {
    await db.delete("organization_sso_providers", id);
    return true;
  }
};
