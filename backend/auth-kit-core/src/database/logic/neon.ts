import { Pool } from "pg";
import { config } from "@database/config";

export const neon = new Pool({
  connectionString: config.DB.DATABASE_URL_NEON,
  ssl: { rejectUnauthorized: false },
});

// Reuse typing
export type NeonClient = typeof neon;
