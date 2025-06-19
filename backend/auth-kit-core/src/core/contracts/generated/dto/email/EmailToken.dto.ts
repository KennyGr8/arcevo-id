import {
  IsString,
  IsInt,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsOptional,
} from "class-validator";

export class EmailTokenDTO {
  @IsString()
  id: string;
  @IsString()
  email: string;
  @IsString()
  token: string;
  @IsOptional()
  type: any;
  @IsDateString()
  expiresAt: Date;
  @IsOptional()
  @IsString()
  userId?: string;
  @IsOptional()
  user?: any;
  @IsDateString()
  createdAt: Date;
}
