import {
  IsString,
  IsInt,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsOptional,
} from "class-validator";

export class ActivityLogDTO {
  @IsString()
  id: string;
  @IsString()
  userId: string;
  @IsOptional()
  user?: any;
  @IsOptional()
  action: any;
  @IsOptional()
  @IsString()
  ip?: string;
  @IsOptional()
  @IsOptional()
  metadata?: any;
  @IsOptional()
  @IsString()
  userAgent?: string;
  @IsDateString()
  createdAt: Date;
}
