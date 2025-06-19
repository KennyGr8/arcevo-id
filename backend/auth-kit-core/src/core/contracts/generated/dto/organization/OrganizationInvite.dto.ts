import {
  IsString,
  IsInt,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsOptional,
} from "class-validator";

export class OrganizationInviteDTO {
  @IsString()
  id: string;
  @IsString()
  email: string;
  @IsString()
  organizationId: string;
  @IsOptional()
  organization?: any;
  @IsOptional()
  role: any;
  @IsOptional()
  @IsString()
  invitedById?: string;
  @IsOptional()
  invitedBy?: any;
  @IsString()
  token: string;
  @IsDateString()
  expiresAt: Date;
  @IsOptional()
  @IsDateString()
  acceptedAt?: Date;
  @IsDateString()
  createdAt: Date;
}
