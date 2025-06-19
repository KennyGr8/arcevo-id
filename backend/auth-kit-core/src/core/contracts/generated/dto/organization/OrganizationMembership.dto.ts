import {
  IsString,
  IsInt,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsOptional,
} from "class-validator";

export class OrganizationMembershipDTO {
  @IsString()
  id: string;
  @IsString()
  userId: string;
  @IsOptional()
  user?: any;
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
  @IsDateString()
  createdAt: Date;
  @IsDateString()
  updatedAt: Date;
}
