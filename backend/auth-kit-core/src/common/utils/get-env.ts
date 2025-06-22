// src/common/utils/get-env.ts

import { env } from "@validators/env.config";

export const getEnv = (key: keyof typeof env, defaultValue?: string): string => {
  const value = env[key];

  if (value !== undefined && value !== null) {
    return String(value);
  }

  if (defaultValue !== undefined) {
    return defaultValue;
  }

  throw new Error(`❌ Environment variable "${key}" is missing and no default was provided.`);
};

/**
 * Get a numeric environment variable.
 */
export const getEnvNumber = (key: keyof typeof env, defaultValue?: number): number => {
  const raw = env[key];

  if (typeof raw === "number") return raw;

  if (raw !== undefined) {
    const parsed = parseInt(String(raw), 10);
    if (!isNaN(parsed)) return parsed;
  }

  if (defaultValue !== undefined) return defaultValue;

  throw new Error(`❌ Environment variable "${key}" is not a valid number and no default was provided.`);
};
