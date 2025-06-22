import type { IMFABackupCodeAdapter } from "@interfaces/database";
import type { MFABackupCodeModel } from "@contracts/generated/types";
import { neon } from "@database";

export const NeonMFABackupCodeAdapter: IMFABackupCodeAdapter<MFABackupCodeModel> = {
  async createMany(data) {
    const inserts = data.map((item, i) => `($${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3})`).join(', ');
    const values = data.flatMap(({ id, code, mfaId }) => [id, code, mfaId]);
    const query = `
      INSERT INTO "mfa_backup_code" (id, code, "mfaId")
      VALUES ${inserts}
      RETURNING *
    `;
    const { rows } = await neon.query(query, values);
    return rows;
  },

  async markAsUsed(code) {
    const result = await neon.query(
      `UPDATE "mfa_backup_code" SET used = true WHERE code = $1 RETURNING *`,
      [code]
    );
    return result.rows[0] ?? null;
  },

  async findUnusedByCode(code) {
    const { rows } = await neon.query(
      `SELECT * FROM "mfa_backup_code" WHERE code = $1 AND used = false`,
      [code]
    );
    return rows[0] ?? null;
  },

  async deleteAll(mfaId) {
    await neon.query(`DELETE FROM "mfa_backup_
