import { IGenericAdapter } from "../IGenericAdapter";
import * as DTO from "./session.dto";

export interface ISessionAdapter<TModel = unknown>
  extends IGenericAdapter<TModel> {
  findAllByUser(userId: string): Promise<TModel[]>;
  create(data: DTO.CreateSessionDto): Promise<TModel>;
  update(id: string, data: DTO.UpdateSessionDto): Promise<TModel>;
  revokeAll(userId: string): Promise<number>;
  revokeCurrent(id: string): Promise<void>;
}
