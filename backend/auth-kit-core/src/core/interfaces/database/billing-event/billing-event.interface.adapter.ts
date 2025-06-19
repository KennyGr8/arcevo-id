import * as DTO from "./billing-event.dto";

export interface IBillingEventAdapter<TModel = unknown> {
  create(data: DTO.CreateBillingEventDto): Promise<TModel>;
  findByUserId(userId: string): Promise<TModel[]>;
  findBySubscriptionId(subscriptionId: string): Promise<TModel[]>;
}
