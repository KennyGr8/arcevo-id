import { BillingProvider } from '@prisma-enums';
import { stripeAdapter } from './providers/stripe/subscription.stripe';
import { paystackAdapter } from './providers/paystack/subscription.paystack';
import { lemonAdapter } from './providers/lemon/subscription.lemon';

export function getSubscriptionAdapter(provider: BillingProvider) {
  switch (provider) {
    case BillingProvider.STRIPE:
      return stripeAdapter;
    case BillingProvider.PAYSTACK:
      return paystackAdapter;
    case BillingProvider.LEMON:
      return lemonAdapter;
    default:
      throw new Error(`Unsupported billing provider: ${provider}`);
  }
}

export interface ISubscriptionAdapter {
  createSubscription(userId: string, plan: string): Promise<any>;
  cancelSubscription(subscriptionId: string): Promise<any>;
  updatePlan(subscriptionId: string, newPlan: string): Promise<any>;
  getSubscription(subscriptionId: string): Promise<any>;
}
