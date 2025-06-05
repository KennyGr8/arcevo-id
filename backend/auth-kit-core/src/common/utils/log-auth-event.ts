import { UAParser } from "ua-parser-js";
import { prisma } from "@database";
import geoip from "geoip-lite";

export async function logAuthEvent({
  userId,
  event,
  userAgent,
  ip,
}: {
  userId: string;
  event: string;
  userAgent?: string;
  ip?: string;
  platform?: string;
  browser?: string;
  locationCity?: string;
  locationCountry?: string;
}) {
  const parser = new UAParser(userAgent);
  const parsed = parser.getResult();

  const detectedPlatform = parsed.os.name || "Unknown OS";
  const detectedBrowser = parsed.browser.name || "Unknown Browser";
  const location = ip ? geoip.lookup(ip) : null;

  return prisma.authLog.create({
    data: {
      userId,
      event,
      ip,
      userAgent,
      platform: detectedPlatform,
      browser: detectedBrowser,
      locationCity: location?.city || null,
      locationCountry: location?.country || null,
    },
  });
}
