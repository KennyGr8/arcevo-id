import fs from "fs/promises";
import path from "path";
import { prisma } from "@database";
import { logger } from "@utils/logger";

const LOG_RETENTION_DAYS = 90; // default 90 days

export async function clean(days = LOG_RETENTION_DAYS) {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    // Fetch old logs before deletion
    const oldLogs = await prisma.authLog.findMany({
      where: {
        createdAt: {
          lt: cutoffDate,
        },
      },
    });

    if (oldLogs.length === 0) {
      logger.info("✅ No old auth logs found for cleanup");
      return;
    }

    // Prepare archive directory
    const archiveDir = path.resolve(process.cwd(), "archives", "auth-logs");
    await fs.mkdir(archiveDir, { recursive: true });

    // Archive file path
    const archivePath = path.join(
      archiveDir,
      `auth-logs-${cutoffDate.toISOString().split("T")[0]}.json`
    );

    // Save logs to file
    await fs.writeFile(archivePath, JSON.stringify(oldLogs, null, 2), "utf-8");

    // Delete old logs
    const { count } = await prisma.authLog.deleteMany({
      where: {
        createdAt: {
          lt: cutoffDate,
        },
      },
    });

    logger.info(`🧹 Archived and cleaned ${count} old auth log(s) older than ${days} days`);
  } catch (error) {
    logger.error("❌ Error during auth log cleanup: " + error);
  }
}
