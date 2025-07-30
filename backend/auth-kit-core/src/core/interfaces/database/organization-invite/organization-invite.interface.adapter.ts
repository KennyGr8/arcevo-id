import { IGenericAdapter } from "../IGenericAdapter";
import * as DTO from "./organization-invite.dto";

export interface IOrganizationInviteAdapter<TModel = unknown>
  extends IGenericAdapter<TModel> {
  create(data: DTO.CreateOrganizationInviteDto): Promise<TModel>;
  findByEmail(email: string): Promise<TModel | null>;
}
