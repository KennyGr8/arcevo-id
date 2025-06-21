import { prisma, OrganizationSSOProviderModel } from "@database";
import * as DTO from "@contracts/generated/dto";
import type { IOrganizationSSOProviderAdapter } from "@interfaces/database";

export const PrismaOrganizationSSOProviderAdapter: IOrganizationSSOProviderAdapter<OrganizationSSOProviderModel> = {
  async getByOrganization(organizationId) {
    return prisma.organizationSSOProvider.findMany({ where: { organizationId } });
  },
  async getById(id) {
    return prisma.organizationSSOProvider.findUnique({ where: { id } });
  },
  async create(data) {
    return prisma.organizationSSOProvider.create({ data });
  },
  async delete(id) {
    await prisma.organizationSSOProvider.delete({ where: { id } });
  }
};
