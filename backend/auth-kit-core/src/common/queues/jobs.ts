import { Queue } from "bullmq";
import { redis } from "./redis";

export const cleanupQueue = new Queue("cleanup", { connection: redis });
