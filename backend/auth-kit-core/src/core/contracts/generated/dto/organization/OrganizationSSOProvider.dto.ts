import {
  IsString,
  IsInt,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsOptional,
} from "class-validator";

export class OrganizationSSOProviderDTO {
  @IsString()
  id: string;
  @IsString()
  organizationId: string;
  @IsOptional()
  organization?: any;
  @IsString()
  provider: string;
  @IsOptional()
  ssoConfig: any;
  @IsDateString()
  createdAt: Date;
}
