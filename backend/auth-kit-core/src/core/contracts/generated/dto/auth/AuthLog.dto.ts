import {
  IsString,
  IsInt,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsOptional,
} from "class-validator";

export class AuthLogDTO {
  @IsString()
  id: string;
  @IsString()
  userId: string;
  @IsOptional()
  user?: any;
  @IsOptional()
  event: any;
  @IsOptional()
  @IsString()
  ip?: string;
  @IsOptional()
  @IsString()
  userAgent?: string;
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
  @IsDateString()
  createdAt: Date;
}
