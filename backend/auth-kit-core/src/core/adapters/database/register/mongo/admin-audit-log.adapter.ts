import { mongo } from "@database";
import type { IAdminAuditLogAdapter } from "@interfaces/database";
import type { AdminAuditLogDTO, AdminAuditLogAdapter } from "@contracts/generated/types";

export const MongoAdminAuditLogAdapter: IAdminAuditLogAdapter<AdminAuditLogAdapter> = {
  async findAll() {
    return mongo.collection<AdminAuditLogAdapter>("admin_audit_logs").find().toArray();
  },
  async findById(id) {
    return mongo.collection<AdminAuditLogAdapter>("admin_audit_logs").findOne({ id });
  },
  async create(data) {
    await mongo.collection("admin_audit_logs").insertOne(data);
    return data;
  },
  async update(id, data) {
    await mongo.collection("admin_audit_logs").updateOne({ id }, { $set: data });
    return this.findById(id);
  },
  async delete(id) {
    await mongo.collection("admin_audit_logs").deleteOne({ id });
  }
};
