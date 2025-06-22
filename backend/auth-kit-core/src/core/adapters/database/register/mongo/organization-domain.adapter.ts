import { mongo } from "@database";
import type { IOrganizationDomainAdapter } from "@interfaces/database";
import type { OrganizationDomainDTO, OrganizationDomainAdapter } from "@contracts/generated/types";

export const MongoOrganizationDomainAdapter: IOrganizationDomainAdapter<OrganizationDomainAdapter> = {
  async createDomain(data) {
    await mongo.collection("organization_domains").insertOne(data);
    return data;
  },
  async verifyDomain(id) {
    await mongo.collection("organization_domains").updateOne({ id }, { $set: { verified: true } });
    return this.getDomainById(id);
  },
  async getDomainById(id) {
    return mongo.collection<OrganizationDomainAdapter>("organization_domains").findOne({ id });
  },
  async getDomainByValue(domain) {
    return mongo.collection<OrganizationDomainAdapter>("organization_domains").findOne({ domain });
  },
  async listDomainsForOrganization(orgId) {
    return mongo.collection<OrganizationDomainAdapter>("organization_domains").find({ organizationId: orgId }).toArray();
  },
  async deleteDomain(id) {
    const res = await mongo.collection("organization_domains").deleteOne({ id });
    return res.deletedCount === 1;
  }
};
