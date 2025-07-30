import { prisma, OrganizationDomainModel } from "@database/logic";
import type { IOrganizationDomainAdapter } from "@interfaces/database";

export const PrismaOrganizationDomainAdapter: IOrganizationDomainAdapter<OrganizationDomainModel> = {
  async findByOrg(orgId) {
    return prisma.organizationDomain.findMany({ where: { organizationId: orgId } });
  },
  async create(data) {
    return prisma.organizationDomain.create({ data });
  },
  async delete(id) {
    await prisma.organizationDomain.delete({ where: { id } });
  }
};
