import { db } from "@database";
import type { IMFAAdapter } from "@interfaces/database";
import type { MFAAdapter } from "@contracts/generated/types";

export const ConvexMFAAdapter: IMFAAdapter<MFAAdapter> = {
  async create(data) {
    const id = await db.insert("mfa", data);
    return { ...data, id };
  },
  async findByUser(userId) {
    return db.first("mfa", q => q.eq(q.field("userId"), userId));
  },
  async findById(id) {
    return db.get("mfa", id);
  },
  async updateSecret(userId, secret) {
    const record = await this.findByUser(userId);
    if (!record) throw new Error("MFA record not found");
    await db.patch("mfa", record.id, { secret });
    return this.findByUser(userId);
  },
  async enableMFA(userId) {
    const record = await this.findByUser(userId);
    if (!record) throw new Error("MFA record not found");
    await db.patch("mfa", record.id, { enabled: true });
    return this.findByUser(userId);
  },
  async disableMFA(userId) {
    const record = await this.findByUser(userId);
    if (!record) return;
    await db.patch("mfa", record.id, { enabled: false });
  },
  async delete(userId) {
    const record = await this.findByUser(userId);
    if (record) await db.delete("mfa", record.id);
  }
};
