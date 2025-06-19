import { cleanupWorker } from "./processors/cleanup.processor";
import { scheduleRecurringJobs } from "./schedulers";
import { logger } from "@utils";

export async function initJobModule() {
  // Register workers and their event listeners
  cleanupWorker.on("completed", (job) => {
    logger.info(`✅ Job '${job.name}' completed`);
  });

  cleanupWorker.on("failed", (job, err) => {
    logger.error(`❌ Job '${job?.name}' failed:`, err);
  });

  // Schedule recurring jobs
  await scheduleRecurringJobs();
  logger.info("📆 Recurring jobs scheduled");
}

// Export any other job-related initializers or utilities if needed
