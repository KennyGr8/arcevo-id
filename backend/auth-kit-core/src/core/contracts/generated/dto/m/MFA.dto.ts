import {
  IsString,
  IsInt,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsOptional,
} from "class-validator";

export class MFADTO {
  @IsString()
  id: string;
  @IsString()
  userId: string;
  @IsOptional()
  user?: any;
  @IsString()
  secret: string;
  @IsBoolean()
  enabled: boolean;
  @IsOptional()
  @IsDateString()
  verifiedAt?: Date;
  @IsDateString()
  createdAt: Date;
  @IsOptional()
  backupCodes?: any;
}
