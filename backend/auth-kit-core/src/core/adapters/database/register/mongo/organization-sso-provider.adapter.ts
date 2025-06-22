import { mongo } from "@database";
import type { IOrganizationSSOProviderAdapter } from "@interfaces/database";
import type { OrganizationSSOProviderDTO, OrganizationSSOProviderAdapter } from "@contracts/generated/types";

export const MongoOrganizationSSOProviderAdapter: IOrganizationSSOProviderAdapter<OrganizationSSOProviderAdapter> = {
  async getByOrganization(organizationId) {
    return mongo.collection<OrganizationSSOProviderAdapter>("organization_sso_providers").find({ organizationId }).toArray();
  },
  async getById(id) {
    return mongo.collection<OrganizationSSOProviderAdapter>("organization_sso_providers").findOne({ id });
  },
  async create(data) {
    await mongo.collection("organization_sso_providers").insertOne(data);
    return data;
  },
  async delete(id) {
    const res = await mongo.collection("organization_sso_providers").deleteOne({ id });
    return res.deletedCount === 1;
  }
};
