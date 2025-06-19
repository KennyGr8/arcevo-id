import {
  IsString,
  IsInt,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsOptional,
} from "class-validator";

export class OrganizationDTO {
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsString()
  slug: string;
  @IsDateString()
  createdAt: Date;
  @IsDateString()
  updatedAt: Date;
  @IsOptional()
  memberships?: any;
  @IsOptional()
  domains?: any;
  @IsOptional()
  invites?: any;
  @IsOptional()
  ssoProviders?: any;
}
