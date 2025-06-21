import * as DTO from "./session.dto";

export interface ISessionAdapter<TModel = unknown> {
  findAllByUser(userId: string): Promise<TModel[]>;
  findById(id: string): Promise<TModel | null>;
  create(data: DTO.CreateSessionDto): Promise<TModel>;
  update(id: string, data: DTO.UpdateSessionDto): Promise<TModel>;
  delete(id: string): Promise<void>;
  revokeAll(userId: string): Promise<number>;
  revokeCurrent(id: string): Promise<void>;
}
