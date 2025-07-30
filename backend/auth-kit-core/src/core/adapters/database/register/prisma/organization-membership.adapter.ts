import { prisma, OrganizationMembershipModel } from "@database/logic";
import type { IOrganizationMembershipAdapter } from "@interfaces/database";

export const PrismaOrganizationMembershipAdapter: IOrganizationMembershipAdapter<OrganizationMembershipModel> = {
  async findByUser(userId) {
    return prisma.organizationMembership.findMany({ where: { userId } });
  },
  async create(data) {
    return prisma.organizationMembership.create({ data });
  },
  async delete(id) {
    await prisma.organizationMembership.delete({ where: { id } });
  }
};
