import { Schema, model, type Document } from 'mongoose';
import { ActivityType } from '@prisma-enums';

export interface IActivityLog extends Document {
  userId: string;
  action: ActivityType;
  ip?: string;
  metadata?: Record<string, any>;
  userAgent?: string;
  createdAt: Date;
}

const activityLogSchema = new Schema<IActivityLog>(
  {
    userId: { type: String, required: true },
    action: { type: String, enum: Object.values(ActivityType), required: true },
    ip: String,
    metadata: { type: Schema.Types.Mixed },
    userAgent: String,
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } }
);

export const ActivityLogModel = model<IActivityLog>('ActivityLog', activityLogSchema);
