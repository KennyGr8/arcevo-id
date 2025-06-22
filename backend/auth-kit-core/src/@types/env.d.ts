// src/env.d.ts

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT: string;

    APP_ORIGIN: string;

    DATABASE_URL: string;
    REDIS_URL: string;

    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_EXPIRES_IN: string;

    BREVO_API_KEY: string;
    MAIL_HOST: string;
    MAIL_PORT: string;
    MAIL_USERNAME: string;
    MAIL_PASSWORD: string;
    MAIL_FROM: string;
    MAIL_ENCRYPTION: 'tls' | 'ssl';

    LOG_RETENTION_DAYS: string;

    STRIPE_SECRET_KEY: string;
    STRIPE_WEBHOOK_SECRET: string;
    STRIPE_PRICE_FREE?: string;
    STRIPE_PRICE_PRO?: string;
    STRIPE_PRICE_ENTERPRISE?: string;

    PAYSTACK_SECRET_KEY?: string;
    PAYSTACK_PUBLIC_KEY?: string;
    PAYSTACK_WEBHOOK_SECRET?: string;
    PAYSTACK_CALLBACK_URL?: string;
    PAYSTACK_WEBHOOK_URL?: string;

    LEMON_API_KEY?: string;
    LEMON_WEBHOOK_SECRET?: string;
  }
}
