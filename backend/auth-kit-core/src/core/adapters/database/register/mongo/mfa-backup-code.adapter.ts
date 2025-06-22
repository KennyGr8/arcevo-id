import { mongo } from "@database";
import type { IMFABackupCodeAdapter } from "@interfaces/database";
import type { MFABackupCodeDTO, MFABackupCodeAdapter } from "@contracts/generated/types";

export const MongoMFABackupCodeAdapter: IMFABackupCodeAdapter<MFABackupCodeAdapter> = {
  async createMany(data) {
    await mongo.collection("mfa_backup_codes").insertMany(data);
    return data;
  },
  async markAsUsed(code) {
    await mongo.collection("mfa_backup_codes").updateOne({ code }, { $set: { used: true } });
    return mongo.collection<MFABackupCodeAdapter>("mfa_backup_codes").findOne({ code });
  },
  async findUnusedByCode(code) {
    return mongo.collection<MFABackupCodeAdapter>("mfa_backup_codes").findOne({ code, used: false });
  },
  async deleteAll(mfaId) {
    await mongo.collection("mfa_backup_codes").deleteMany({ mfaId });
  }
};
