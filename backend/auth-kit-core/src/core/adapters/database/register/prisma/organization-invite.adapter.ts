import { prisma, OrganizationInviteModel } from "@database/logic";
import type { IOrganizationInviteAdapter } from "@interfaces/database";

export const PrismaOrganizationInviteAdapter: IOrganizationInviteAdapter<OrganizationInviteModel> = {
  async findByToken(token) {
    return prisma.organizationInvite.findUnique({ where: { token } });
  },
  async create(data) {
    return prisma.organizationInvite.create({ data });
  },
  async delete(id) {
    await prisma.organizationInvite.delete({ where: { id } });
  }
};
