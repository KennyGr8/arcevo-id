// database/config/app.config.ts

import { getEnv, getEnvNumber } from '@utils/get-env';

const appConfig = () => ({
  NODE_ENV: getEnv('NODE_ENV', 'development'),
  PORT: getEnvNumber('PORT', 5000),
  BASE_PATH: getEnv('BASE_PATH', '/api/v1'),
  APP_ORIGIN: getEnv('APP_ORIGIN'),

  DB: {
    DATABASE_URL_PRISMA: getEnv('DATABASE_URL_PRISMA'),
    DATABASE_URL_NEON: getEnv('DATABASE_URL_NEON'),
    MONGODB_URI: getEnv('MONGODB_URI'),
    MONGODB_NAME: getEnv('MONGODB_NAME', 'arcevo-id'),
    PROVIDER: getEnv('DB_PROVIDER', 'neon'),
  },

  REDIS_URL: getEnv('REDIS_URL'),
  LOG_RETENTION_DAYS: getEnvNumber('LOG_RETENTION_DAYS', 90),

  JWT: {
    SECRET: getEnv('JWT_SECRET'),
    EXPIRES_IN: getEnv('JWT_EXPIRES_IN', '15m'),
    REFRESH_SECRET: getEnv('JWT_REFRESH_SECRET'),
    REFRESH_EXPIRES_IN: getEnv('JWT_REFRESH_EXPIRES_IN', '30d'),
  },

  MAILER: {
    PROVIDER: 'brevo',
    API_KEY: getEnv('BREVO_API_KEY'),
    HOST: getEnv('MAIL_HOST'),
    PORT: getEnvNumber('MAIL_PORT', 587),
    USERNAME: getEnv('MAIL_USERNAME'),
    PASSWORD: getEnv('MAIL_PASSWORD'),
    FROM: getEnv('MAIL_FROM'),
    ENCRYPTION: getEnv('MAIL_ENCRYPTION', 'tls'),
  },

  BILLING: {
    STRIPE: {
      secretKey: getEnv('STRIPE_SECRET_KEY'),
      webhookSecret: getEnv('STRIPE_WEBHOOK_SECRET'),
      priceIds: {
        free: getEnv('STRIPE_PRICE_FREE', ''),
        pro: getEnv('STRIPE_PRICE_PRO', ''),
        enterprise: getEnv('STRIPE_PRICE_ENTERPRISE', ''),
      },
    },
    PAYSTACK: {
      secretKey: getEnv('PAYSTACK_SECRET_KEY', ''),
      publicKey: getEnv('PAYSTACK_PUBLIC_KEY', ''),
      webhookSecret: getEnv('PAYSTACK_WEBHOOK_SECRET', ''),
      callbackUrl: getEnv('PAYSTACK_CALLBACK_URL', ''),
      webhookUrl: getEnv('PAYSTACK_WEBHOOK_URL', ''),
    },
    LEMON: {
      apiKey: getEnv('LEMON_API_KEY', ''),
      webhookSecret: getEnv('LEMON_WEBHOOK_SECRET', ''),
    },
  },
});

export const config = appConfig();
