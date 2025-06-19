import {
  IsString,
  IsInt,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsOptional,
} from "class-validator";

export class UserDTO {
  @IsString()
  id: string;
  @IsString()
  email: string;
  @IsOptional()
  @IsString()
  password?: string;
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsDateString()
  emailVerified?: Date;
  @IsOptional()
  role: any;
  @IsDateString()
  createdAt: Date;
  @IsDateString()
  updatedAt: Date;
  @IsBoolean()
  isDeactivated: boolean;
  @IsOptional()
  @IsDateString()
  deletedAt?: Date;
  @IsOptional()
  status: any;
  @IsOptional()
  authLogs?: any;
  @IsOptional()
  sessions?: any;
  @IsOptional()
  mfa?: any;
  @IsOptional()
  activityLogs?: any;
  @IsOptional()
  accounts?: any;
  @IsOptional()
  tokens?: any;
  @IsOptional()
  subscription?: any;
  @IsOptional()
  auditLogs?: any;
  @IsOptional()
  organizationInvitesSent?: any;
  @IsOptional()
  organizationMemberships?: any;
  @IsOptional()
  organizationMembershipsInvited?: any;
  @IsOptional()
  billingEvents?: any;
}
