import { Schema, model, type Document } from 'mongoose';

export interface IMFA extends Document {
  userId: string;
  secret: string;
  enabled: boolean;
  verifiedAt?: Date;
  createdAt: Date;
}

const mfaSchema = new Schema<IMFA>(
  {
    userId: { type: String, required: true, unique: true },
    secret: { type: String, required: true },
    enabled: { type: Boolean, default: false },
    verifiedAt: { type: Date },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } }
);

export const MFAModel = model<IMFA>('MFA', mfaSchema);
