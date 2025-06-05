import { Redis } from "ioredis";

export const redis = new Redis({
  host: "localhost", // or from your config
  port: 6379,
});
