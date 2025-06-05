import { cleanupQueue } from "./jobs";

export async function scheduleRecurringJobs() {
  await cleanupQueue.add(
    "clean-auth-logs",
    {},
    { repeat: { pattern: "0 3 * * *" } } // every day at 3 AM
  );

  await cleanupQueue.add(
    "clean-expired-sessions",
    {},
    { repeat: { pattern: "0 4 * * *" } } // every day at 4 AM
  );
}
