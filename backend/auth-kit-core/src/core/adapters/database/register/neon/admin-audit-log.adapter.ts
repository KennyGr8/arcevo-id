import type { IAdminAuditLogAdapter } from "@interfaces/database";
import type { AdminAuditLogModel } from "@contracts/generated/types";
import {
  findAll,
  findById,
  insertInto,
  updateById,
  deleteById,
} from "@database/utils/neon-query";

export const NeonAdminAuditLogAdapter: IAdminAuditLogAdapter<AdminAuditLogModel> = {
  async findAll() {
    return findAll("admin_audit_log");
  },

  async findById(id) {
    return findById("admin_audit_log", id);
  },

  async create(data) {
    return insertInto("admin_audit_log", data);
  },

  async update(id, data) {
    return updateById("admin_audit_log", id, data);
  },

  async delete(id) {
    return deleteById("admin_audit_log", id);
  },
};
