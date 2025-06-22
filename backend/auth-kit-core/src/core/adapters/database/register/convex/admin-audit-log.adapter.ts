import { db } from "@database";
import type { IAdminAuditLogAdapter } from "@interfaces/database";
import type { AdminAuditLogAdapter } from "@contracts/generated/types";

export const ConvexAdminAuditLogAdapter: IAdminAuditLogAdapter<AdminAuditLogAdapter> = {
  async findAll() {
    return db.query("admin_audit_logs");
  },
  async findById(id) {
    return db.get("admin_audit_logs", id);
  },
  async create(data) {
    const id = await db.insert("admin_audit_logs", data);
    return { ...data, id };
  },
  async update(id, data) {
    await db.patch("admin_audit_logs", id, data);
    return this.findById(id);
  },
  async delete(id) {
    await db.delete("admin_audit_logs", id);
  }
};
