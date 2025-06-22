import * as DTO from "./organization-invite.dto";

export interface IOrganizationInviteAdapter<TModel = unknown> {
  create(data: DTO.CreateOrganizationInviteDto): Promise<TModel>;
  findById(id: string): Promise<TModel | null>;
  findByEmail(email: string): Promise<TModel | null>;
  delete(id: string): Promise<boolean>;
}
