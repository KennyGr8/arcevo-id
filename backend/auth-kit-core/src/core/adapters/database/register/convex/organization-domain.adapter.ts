import { db } from "@database";
import type { IOrganizationDomainAdapter } from "@interfaces/database";
import type { OrganizationDomainAdapter } from "@contracts/generated/types";

export const ConvexOrganizationDomainAdapter: IOrganizationDomainAdapter<OrganizationDomainAdapter> = {
  async createDomain(data) {
    const id = await db.insert("organization_domains", data);
    return { ...data, id };
  },
  async verifyDomain(id) {
    await db.patch("organization_domains", id, { verified: true });
    return db.get("organization_domains", id);
  },
  async getDomainById(id) {
    return db.get("organization_domains", id);
  },
  async getDomainByValue(domain) {
    return db.first("organization_domains", q => q.eq(q.field("domain"), domain));
  },
  async listDomainsForOrganization(orgId) {
    return db.filter("organization_domains", q => q.eq(q.field("organizationId"), orgId));
  },
  async deleteDomain(id) {
    await db.delete("organization_domains", id);
    return true;
  }
};
