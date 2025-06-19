import * as DTO from "./organization-sso-provider.dto";

export interface IOrganizationSSOProviderAdapter<TModel = unknown> {
  getByOrganization(organizationId: string): Promise<TModel[]>;
  getById(id: string): Promise<TModel | null>;
  create(data: DTO.CreateSSOProviderDto): Promise<TModel>;
  delete(id: string): Promise<boolean>;
}