import { mongo } from "@database";
import type { IOrganizationAdapter } from "@interfaces/database";
import type { OrganizationDTO, OrganizationAdapter } from "@contracts/generated/types";

export const MongoOrganizationAdapter: IOrganizationAdapter<OrganizationAdapter> = {
  async createOrganization(data) {
    await mongo.collection("organizations").insertOne(data);
    return data;
  },
  async getOrganizationById(id) {
    return mongo.collection<OrganizationAdapter>("organizations").findOne({ id });
  },
  async getOrganizationBySlug(slug) {
    return mongo.collection<OrganizationAdapter>("organizations").findOne({ slug });
  },
  async updateOrganization(id, data) {
    await mongo.collection("organizations").updateOne({ id }, { $set: data });
    return this.getOrganizationById(id);
  },
  async deleteOrganization(id) {
    const res = await mongo.collection("organizations").deleteOne({ id });
    return res.deletedCount === 1;
  },
  async listOrganizations() {
    return mongo.collection<OrganizationAdapter>("organizations").find().toArray();
  }
};
