import { adapter, type DatabaseProvider } from "@adapters/database/registry";
import type { AdapterRegistry } from "@/@types/adapter-registry";
import { config } from "@database/config";

const DEFAULT_PROVIDER = config.DB.PROVIDER;

if (!(DEFAULT_PROVIDER in adapter)) {
  throw new Error(`❌ Invalid DB_PROVIDER: ${DEFAULT_PROVIDER}`);
}

export function getDB(provider: DatabaseProvider = DEFAULT_PROVIDER): AdapterRegistry {
  return adapter[provider];
}

export const db = getDB();
