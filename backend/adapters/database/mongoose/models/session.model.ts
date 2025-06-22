import { Schema, model, type Document } from 'mongoose';

export interface ISession extends Document {
  userId: string;
  ip?: string;
  userAgent?: string;
  deviceName?: string;
  platform?: string;
  browser?: string;
  locationCity?: string;
  locationCountry?: string;
  fingerprint?: string;
  createdAt: Date;
  expiresAt: Date;
  valid: boolean;
  refreshToken?: string;
  firstSeenAt?: Date;
  lastUsedAt?: Date;
  lastActiveAt?: Date;
}

const sessionSchema = new Schema<ISession>(
  {
    userId: { type: String, required: true },
    ip: String,
    userAgent: String,
    deviceName: String,
    platform: String,
    browser: String,
    locationCity: String,
    locationCountry: String,
    fingerprint: String,
    refreshToken: String,
    valid: { type: Boolean, default: true },
    expiresAt: { type: Date, required: true },
    firstSeenAt: Date,
    lastUsedAt: Date,
    lastActiveAt: Date,
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } }
);

export const SessionModel = model<ISession>('Session', sessionSchema);
