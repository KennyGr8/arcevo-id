import type { ActivityType } from "@prisma-enums";
import * as DTO from "./activity-log.dto";

export interface IActivityLogAdapter<TModel = unknown> {
  logActivity(data: DTO.CreateActivityLogDto): Promise<TModel>;
  getUserActivity(userId: string, limit?: number): Promise<TModel[]>;
  getActivitiesByType(type: ActivityType): Promise<TModel[]>;
}
