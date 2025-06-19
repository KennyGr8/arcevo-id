export interface BillingEventAdapter {
  id: String;
  userId: String;
  user: any;
  subscriptionId: String;
  subscription: any;
  eventType: BillingEventType;
  provider: SubscriptionProvider;
  status?: String;
  metadata?: Json;
  createdAt: DateTime;
}
