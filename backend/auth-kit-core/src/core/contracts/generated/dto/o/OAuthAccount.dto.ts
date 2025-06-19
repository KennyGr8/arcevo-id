import {
  IsString,
  IsInt,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsOptional,
} from "class-validator";

export class OAuthAccountDTO {
  @IsString()
  id: string;
  @IsString()
  userId: string;
  @IsOptional()
  user?: any;
  @IsOptional()
  provider: any;
  @IsString()
  providerUserId: string;
  @IsOptional()
  @IsString()
  accessToken?: string;
  @IsOptional()
  @IsString()
  refreshToken?: string;
  @IsOptional()
  @IsDateString()
  expiresAt?: Date;
  @IsDateString()
  createdAt: Date;
}
