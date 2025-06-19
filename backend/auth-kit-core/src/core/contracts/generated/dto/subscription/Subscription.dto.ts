import {
  IsString,
  IsInt,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsOptional,
} from "class-validator";

export class SubscriptionDTO {
  @IsString()
  id: string;
  @IsString()
  userId: string;
  @IsOptional()
  user?: any;
  @IsOptional()
  plan: any;
  @IsOptional()
  status: any;
  @IsOptional()
  provider: any;
  @IsOptional()
  @IsString()
  stripeCustomerId?: string;
  @IsOptional()
  @IsString()
  stripeSubId?: string;
  @IsOptional()
  @IsString()
  paystackCustomerId?: string;
  @IsOptional()
  @IsString()
  paystackSubCode?: string;
  @IsOptional()
  @IsString()
  lemonCustomerId?: string;
  @IsOptional()
  @IsString()
  lemonOrderId?: string;
  @IsDateString()
  currentPeriodEnd: Date;
  @IsOptional()
  billingEvents?: any;
  @IsDateString()
  createdAt: Date;
  @IsDateString()
  updatedAt: Date;
}
