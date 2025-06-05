import { prisma } from "@database";
import { config } from "@database/config/app.config";
import { logger } from "@utils/logger";

const LOG_RETENTION_DAYS = Number(config.LOG_RETENTION_DAYS) || 90;

export async function cleanOldAuthLogs(days = LOG_RETENTION_DAYS) {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const { count } = await prisma.authLog.deleteMany({
      where: {
        createdAt: {
          lt: cutoffDate,
        },
      },
    });

    if (count > 0) {
      logger.info(`🧹 Cleaned ${count} old auth log(s) older than ${days} days`);
    } else {
      logger.info("✅ No old auth logs found for cleanup");
    }
  } catch (error) {
    logger.error("❌ Error during auth log cleanup: " + error);
  }
}
