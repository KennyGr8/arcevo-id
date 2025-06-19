export interface SubscriptionAdapter {
  id: String;
  userId: String;
  user: any;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  provider: SubscriptionProvider;
  stripeCustomerId?: String;
  stripeSubId?: String;
  paystackCustomerId?: String;
  paystackSubCode?: String;
  lemonCustomerId?: String;
  lemonOrderId?: String;
  currentPeriodEnd: DateTime;
  billingEvents: any;
  createdAt: DateTime;
  updatedAt: DateTime;
}
