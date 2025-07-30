import { Schema, model, type Document } from 'mongoose';
import { AdminAction } from '@prisma-enums';

export interface IAdminAuditLog extends Document {
  action: AdminAction;
  actorId?: string;
  target?: string;
  meta?: Record<string, any>;
  createdAt: Date;
}

const adminAuditLogSchema = new Schema<IAdminAuditLog>(
  {
    action: { type: String, enum: Object.values(AdminAction), required: true },
    actorId: String,
    target: String,
    meta: { type: Schema.Types.Mixed },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const AdminAuditLogModel = model<IAdminAuditLog>('AdminAuditLog', adminAuditLogSchema);
