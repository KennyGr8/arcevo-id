import type { IOrganizationAdapter } from "@interfaces/database";
import type { prisma, OrganizationModel } from "@database";
import * as DTO from "@contracts/generated/dto/organization.dto";

export const PrismaOrganizationAdapter: IOrganizationAdapter<OrganizationModel> = {
  async createOrganization(data: DTO.CreateOrganizationDto) {
    return prisma.organization.create({ data });
  },
  async getOrganizationById(id: string) {
    return prisma.organization.findUnique({ where: { id } });
  },
  async getOrganizationBySlug(slug: string) {
    return prisma.organization.findUnique({ where: { slug } });
  },
  async updateOrganization(id: string, data: DTO.UpdateOrganizationDto) {
    return prisma.organization.update({ where: { id }, data });
  },
  async deleteOrganization(id: string) {
    const res = await prisma.organization.delete({ where: { id } });
    return !!res;
  },
  async listOrganizations() {
    return prisma.organization.findMany();
  }
};
