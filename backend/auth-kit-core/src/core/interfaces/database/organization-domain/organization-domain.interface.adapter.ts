import * as DTO from "./organization-domain.dto";

export interface IOrganizationDomainAdapter<TModel = unknown> {
  createDomain(data: DTO.CreateOrganizationDomainDto): Promise<TModel>;
  verifyDomain(id: string): Promise<TModel>;
  getDomainById(id: string): Promise<TModel | null>;
  getDomainByValue(domain: string): Promise<TModel | null>;
  listDomainsForOrganization(orgId: string): Promise<TModel[]>;
  deleteDomain(id: string): Promise<boolean>;
}
