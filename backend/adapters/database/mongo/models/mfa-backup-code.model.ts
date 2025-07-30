import { Schema, model, type Document } from 'mongoose';

export interface IMFABackupCode extends Document {
  code: string;
  usedAt?: Date;
  mfaId: string;
}

const mfaBackupCodeSchema = new Schema<IMFABackupCode>(
  {
    code: { type: String, required: true },
    usedAt: Date,
    mfaId: { type: String, required: true },
  },
  { timestamps: false }
);

export const MFABackupCodeModel = model<IMFABackupCode>('MFABackupCode', mfaBackupCodeSchema);
