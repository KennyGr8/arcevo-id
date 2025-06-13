import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../../middlewares/asyncHandler";
import { prisma } from "../../../database";
import { logActivity } from "../../../common/utils/log-activity";
import {
  getLocationFromIP,
  parseUserAgent,
  generateFingerprint,
} from "../../../common/utils/device";

export const updateSessionActivity = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const sessionId = req.sessionId;
    if (!userId || !sessionId) return next();

    const ip = req.ip || "";
    const userAgent = req.headers["user-agent"] || "";
    const location = getLocationFromIP(ip);
    const { device, os, browser } = parseUserAgent(userAgent);
    const fingerprint = generateFingerprint({ ip, userAgent }); // or req.headers['x-device-fingerprint']

    const session = await prisma.session.findUnique({ where: { id: sessionId } });
    if (!session) return next();

    const hasChanged =
      session.ip !== ip ||
      `${session.locationCity},${session.locationCountry}` !== location ||
      session.deviceName !== device ||
      session.platform !== os ||
      session.browser !== browser ||
      (session as any).deviceFingerprint !== fingerprint;

    await prisma.session.update({
      where: { id: sessionId },
      data: {
        lastUsedAt: new Date(),
        ...(hasChanged && {
          ip,
          locationCity: location.split(",")[0] || null,
          locationCountry: location.split(",")[1] || null,
          deviceName: device,
          platform: os,
          browser,
          deviceFingerprint: fingerprint,
          lastActiveAt: new Date(),
        }),
      },
    });

    if (hasChanged) {
      await logActivity(userId, "session_environment_changed", {
        ip,
        location,
        device,
        platform: os,
        browser,
      });

      // Optional: notify admin/user
      // await notifySecurityEvent(userId, 'new_device_login', { ip, location, device })
    } else {
      await logActivity(userId, "session_active", { ip, userAgent });
    }

    return next();
  }
);
