import {
  IsString,
  IsInt,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsOptional,
} from "class-validator";

export class BillingEventDTO {
  @IsString()
  id: string;
  @IsString()
  userId: string;
  @IsOptional()
  user?: any;
  @IsString()
  subscriptionId: string;
  @IsOptional()
  subscription?: any;
  @IsOptional()
  eventType: any;
  @IsOptional()
  provider: any;
  @IsOptional()
  @IsString()
  status?: string;
  @IsOptional()
  @IsOptional()
  metadata?: any;
  @IsDateString()
  createdAt: Date;
}
