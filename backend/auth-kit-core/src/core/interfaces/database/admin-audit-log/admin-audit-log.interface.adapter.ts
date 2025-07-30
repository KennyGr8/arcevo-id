import * as DTO from "./admin-audit-log.dto";

export interface IAdminAuditLogAdapter<TModel = unknown>
  extends IGenericAdapter<TModel> {
  findAll(): Promise<TModel[]>;
  create(data: DTO.CreateAdminAuditLogDto): Promise<TModel>;
  update(id: string, data: DTO.UpdateAdminAuditLogDto): Promise<TModel>;
}
