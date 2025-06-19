import {
  IsString,
  IsInt,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsOptional,
} from "class-validator";

export class AdminAuditLogDTO {
  @IsString()
  id: string;
  @IsOptional()
  action: any;
  @IsOptional()
  @IsString()
  actorId?: string;
  @IsOptional()
  actor?: any;
  @IsOptional()
  @IsString()
  target?: string;
  @IsOptional()
  @IsOptional()
  meta?: any;
  @IsDateString()
  createdAt: Date;
}
