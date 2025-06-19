import * as DTO from "./mfa-backup-code.dto";

export interface IMFABackupCodeAdapter<TModel = unknown> {
  createMany(data: DTO.CreateBackupCodesDto): Promise<TModel[]>;
  markAsUsed(code: string): Promise<TModel | null>;
  findUnusedByCode(code: string): Promise<TModel | null>;
  deleteAll(mfaId: string): Promise<void>;
}
