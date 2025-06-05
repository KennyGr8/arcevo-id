import { prisma } from "@database";
import { logger } from "@logger";

export async function cleanExpiredSessions() {
  try {
    const now = new Date();

    // Invalidate sessions where expiresAt < now and valid = true
    const { count } = await prisma.session.updateMany({
      where: {
        expiresAt: { lt: now },
        valid: true,
      },
      data: {
        valid: false,
      },
    });

    if (count > 0) {
      logger.info(`🧹 Cleaned up ${count} expired sessions`);
    } else {
      logger.info("✅ No expired sessions to clean up");
    }
  } catch (error) {
    logger.error("❌ Error during session cleanup: " + error);
  }
}
