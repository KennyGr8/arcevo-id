import { Worker } from "bullmq";
import { redis } from "../redis";
import { cleanOldAuthLogs } from "@utils/cron/auth-log.cleanup";
import { cleanExpiredSessions } from "@utils/cron/session.cleanup";

export const cleanupWorker = new Worker(
  "cleanup",
  async (job) => {
    if (job.name === "clean-auth-logs") {
      await cleanOldAuthLogs();
    } else if (job.name === "clean-expired-sessions") {
      await cleanExpiredSessions();
    }
  },
  { connection: redis }
);
