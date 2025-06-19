import * as DTO from "./admin-audit-log.dto";

export interface IAdminAuditLogAdapter<TModel = unknown> {
  findAll(): Promise<TModel[]>;
  findById(id: string): Promise<TModel | null>;
  create(data: DTO.CreateAdminAuditLogDto): Promise<TModel>;
  update(id: string, data: DTO.UpdateAdminAuditLogDto): Promise<TModel>;
  delete(id: string): Promise<void>;
}
