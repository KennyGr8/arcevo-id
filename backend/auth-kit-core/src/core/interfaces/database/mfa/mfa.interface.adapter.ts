import * as DTO from "./mfa.dto";

export interface IMFAAdapter<TModel = unknown> {
  create(data: DTO.CreateMFADto): Promise<TModel>;
  findByUser(userId: string): Promise<TModel | null>;
  findById(id: string): Promise<TModel | null>;
  updateSecret(userId: string, secret: string): Promise<TModel>;
  enableMFA(userId: string): Promise<TModel>;
  disableMFA(userId: string): Promise<void>;
  delete(userId: string): Promise<void>;
}
