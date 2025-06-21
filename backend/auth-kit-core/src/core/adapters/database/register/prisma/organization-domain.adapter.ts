import { prisma, OrganizationDomainModel } from "@database";
import * as DTO from "@contracts/generated/dto";
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
