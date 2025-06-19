import * as DTO from "./organization.dto";

export interface IOrganizationAdapter<TModel = unknown> {
  createOrganization(data: DTO.CreateOrganizationDto): Promise<TModel>;
  getOrganizationById(id: string): Promise<TModel | null>;
  getOrganizationBySlug(slug: string): Promise<TModel | null>;
  updateOrganization(id: string, data: DTO.UpdateOrganizationDto): Promise<TModel>;
  deleteOrganization(id: string): Promise<boolean>;
  listOrganizations(): Promise<TModel[]>;
}
