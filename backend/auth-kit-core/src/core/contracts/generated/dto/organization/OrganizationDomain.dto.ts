import {
  IsString,
  IsInt,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsOptional,
} from "class-validator";

export class OrganizationDomainDTO {
  @IsString()
  id: string;
  @IsString()
  organizationId: string;
  @IsOptional()
  organization?: any;
  @IsString()
  domain: string;
  @IsBoolean()
  verified: boolean;
}
