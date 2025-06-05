import Redis from "ioredis";
import { config } from "@database/config/app.config";

export let redis: Redis;

export async function connectRedis() {
  redis = new Redis(config.REDIS_URL);

  redis.on("connect", () => console.log("🧠 Redis connected"));
  redis.on("error", (err) => console.error("❌ Redis error:", err));
}
