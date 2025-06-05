import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  PORT: z.coerce.number().default(5000),

  APP_ORIGIN: z.string().url(),

  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),

  JWT_SECRET: z.string().min(10),
  JWT_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_SECRET: z.string().min(10),
  JWT_REFRESH_EXPIRES_IN: z.string().default('30d'),

  // SMTP (Brevo)
  BREVO_API_KEY: z.string().min(10),
  MAIL_HOST: z.string(),
  MAIL_PORT: z.coerce.number().default(587),
  MAIL_USERNAME: z.string().email(),
  MAIL_PASSWORD: z.string().min(10),
  MAIL_FROM: z.string().email(),
  MAIL_ENCRYPTION: z.enum(['tls', 'ssl']).default('tls'),

  LOG_RETENTION_DAYS: z.coerce.number().default(90),

  // Billing: Stripe
  STRIPE_SECRET_KEY: z.string().min(10),
  STRIPE_WEBHOOK_SECRET: z.string().min(10),
  STRIPE_PRICE_FREE: z.string().optional(), // Allow optional to support feature flags
  STRIPE_PRICE_PRO: z.string().optional(),
  STRIPE_PRICE_ENTERPRISE: z.string().optional(),

  // Billing: Paystack
  PAYSTACK_SECRET_KEY: z.string().optional(),
  PAYSTACK_PUBLIC_KEY: z.string().optional(),
  PAYSTACK_WEBHOOK_SECRET: z.string().optional(),
  PAYSTACK_CALLBACK_URL: z.string().optional(),
  PAYSTACK_WEBHOOK_URL: z.string().optional(),

  // Billing: LemonSqueezy
  LEMON_API_KEY: z.string().optional(),
  LEMON_WEBHOOK_SECRET: z.string().optional(),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment configuration:', parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
