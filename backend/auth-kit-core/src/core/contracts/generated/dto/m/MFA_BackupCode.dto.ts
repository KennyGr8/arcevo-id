import {
  IsString,
  IsInt,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsOptional,
} from "class-validator";

export class MFA_BackupCodeDTO {
  @IsString()
  id: string;
  @IsString()
  code: string;
  @IsOptional()
  @IsDateString()
  usedAt?: Date;
  @IsString()
  mfaId: string;
  @IsOptional()
  mfa?: any;
}
