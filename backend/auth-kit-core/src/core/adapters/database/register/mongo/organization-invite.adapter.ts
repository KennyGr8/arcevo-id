import { mongo } from "@database";
import type { IOrganizationInviteAdapter } from "@interfaces/database";
import type { OrganizationInviteDTO, OrganizationInviteAdapter } from "@contracts/generated/types";

export const MongoOrganizationInviteAdapter: IOrganizationInviteAdapter<OrganizationInviteAdapter> = {
  async create(data) {
    await mongo.collection("organization_invites").insertOne(data);
    return data;
  },
  async findById(id) {
    return mongo.collection<OrganizationInviteAdapter>("organization_invites").findOne({ id });
  },
  async findByEmail(email) {
    return mongo.collection<OrganizationInviteAdapter>("organization_invites").findOne({ email });
  },
  async delete(id) {
    const res = await mongo.collection("organization_invites").deleteOne({ id });
    return res.deletedCount === 1;
  }
};
