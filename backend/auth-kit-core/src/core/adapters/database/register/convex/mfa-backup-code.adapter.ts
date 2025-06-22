import { db } from "@database";
import type { IMFABackupCodeAdapter } from "@interfaces/database";
import type { MFABackupCodeAdapter } from "@contracts/generated/types";

export const ConvexMFABackupCodeAdapter: IMFABackupCodeAdapter<MFABackupCodeAdapter> = {
  async createMany(data) {
    const results = [];
    for (const code of data.codes) {
      const id = await db.insert("mfa_backup_codes", { ...code });
      results.push({ ...code, id });
    }
    return results;
  },
  async markAsUsed(code) {
    const record = await db.first("mfa_backup_codes", q => q.eq(q.field("code"), code).eq(q.field("used"), false));
    if (!record) return null;
    await db.patch("mfa_backup_codes", record.id, { used: true });
    return { ...record, used: true };
  },
  async findUnusedByCode(code) {
    return db.first("mfa_backup_codes", q => q.eq(q.field("code"), code).eq(q.field("used"), false));
  },
  async deleteAll(mfaId) {
    const codes = await db.filter("mfa_backup_codes", q => q.eq(q.field("mfaId"), mfaId));
    for (const c of codes) await db.delete("mfa_backup_codes", c.id);
  }
};
