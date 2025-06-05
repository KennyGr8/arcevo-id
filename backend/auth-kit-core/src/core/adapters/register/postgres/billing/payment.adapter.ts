export interface IPaymentAdapter {
  createCheckoutSession(userId: string, plan: string): Promise<{ url: string }>;
  handleWebhook(event: any): Promise<void>;
}
