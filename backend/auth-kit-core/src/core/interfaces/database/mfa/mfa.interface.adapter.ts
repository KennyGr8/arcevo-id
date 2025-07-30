import * as DTO from "./mfa.dto";

export interface IMFAAdapter<TModel = unknown>
  extends IGenericAdapter<TModel> {
  create(data: DTO.CreateMFADto): Promise<TModel>;
  findByUser(userId: string): Promise<TModel | null>;
  updateSecret(userId: string, secret: string): Promise<TModel>;
  enableMFA(userId: string): Promise<TModel>;
  disableMFA(userId: string): Promise<void>;
}
