import { Schema, model, type Document } from 'mongoose';
import { Role, UserStatus } from '@prisma-enums';

export interface IUser extends Document {
  email: string;
  password?: string;
  name?: string;
  emailVerified?: Date;
  role: Role;
  isDeactivated: boolean;
  deletedAt?: Date;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    name: { type: String },
    emailVerified: { type: Date },
    role: { type: String, enum: Object.values(Role), default: Role.USER },
    isDeactivated: { type: Boolean, default: false },
    deletedAt: { type: Date },
    status: { type: String, enum: Object.values(UserStatus), default: UserStatus.active },
  },
  { timestamps: true }
);

export const UserModel = model<IUser>('User', userSchema);
