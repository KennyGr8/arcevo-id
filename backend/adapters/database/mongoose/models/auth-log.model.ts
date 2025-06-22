import { Schema, model, type Document } from 'mongoose';
import { AuthEvent } from '@prisma-enums';

export interface IAuthLog extends Document {
  userId: string;
  event: AuthEvent;
  ip?: string;
  userAgent?: string;
  platform?: string;
  browser?: string;
  locationCity?: string;
  locationCountry?: string;
  createdAt: Date;
}

const authLogSchema = new Schema<IAuthLog>(
  {
    userId: { type: String, required: true },
    event: { type: String, enum: Object.values(AuthEvent), required: true },
    ip: String,
    userAgent: String,
    platform: String,
    browser: String,
    locationCity: String,
    locationCountry: String,
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } }
);

export const AuthLogModel = model<IAuthLog>('AuthLog', authLogSchema);
