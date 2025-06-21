import * as DTO from "./subscription.dto";

export interface ISubscriptionAdapter<TModel = unknown> {
  findByUserId(userId: string): Promise<TModel | null>;
  create(data: DTO.CreateSubscriptionDto): Promise<TModel>;
  update(id: string, data: DTO.UpdateSubscriptionDto): Promise<TModel>;
  cancel(id: string): Promise<void>;
}