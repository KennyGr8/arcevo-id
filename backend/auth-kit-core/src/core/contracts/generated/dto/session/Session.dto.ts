import {
  IsString,
  IsInt,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsOptional,
} from "class-validator";

export class SessionDTO {
  @IsString()
  id: string;
  @IsString()
  userId: string;
  @IsOptional()
  user?: any;
  @IsOptional()
  @IsString()
  ip?: string;
  @IsOptional()
  @IsString()
  userAgent?: string;
  @IsOptional()
  @IsString()
  deviceName?: string;
  @IsOptional()
  @IsString()
  platform?: string;
  @IsOptional()
  @IsString()
  browser?: string;
  @IsOptional()
  @IsString()
  locationCity?: string;
  @IsOptional()
  @IsString()
  locationCountry?: string;
  @IsOptional()
  @IsString()
  fingerprint?: string;
  @IsDateString()
  createdAt: Date;
  @IsOptional()
  @IsDateString()
  lastActiveAt?: Date;
  @IsDateString()
  expiresAt: Date;
  @IsBoolean()
  valid: boolean;
  @IsOptional()
  @IsString()
  refreshToken?: string;
  @IsOptional()
  @IsDateString()
  firstSeenAt?: Date;
  @IsOptional()
  @IsDateString()
  lastUsedAt?: Date;
}
