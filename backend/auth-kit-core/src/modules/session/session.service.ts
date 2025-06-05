import { NotFoundException } from "../../common/utils/catch-errors";
import { UAParser } from "ua-parser-js";
import geoip from "geoip-lite";
import { prisma } from "../../database";
import { thirtyDaysFromNow } from "../../common/utils/date-time";
import { logAuthEvent } from "../../common/utils/log-auth-event";

export async function createSession(
  userId: string,
  metadata: {
    ip?: string;
    userAgent: string;
    fingerprint?: string;
    deviceInfo?: {
      device: string;
      platform: string;
      browser: string;
    };
    location?: string;
  }
) {
  const { ip, userAgent, fingerprint, deviceInfo, location } = metadata;
  const expiresAt = thirtyDaysFromNow();
  const now = new Date();

  const deviceName = deviceInfo?.device || "Unknown Device";
  const platform = deviceInfo?.platform || "Unknown OS";
  const browser = deviceInfo?.browser || "Unknown Browser";

  let locationCity: string | null = null;
  let locationCountry: string | null = null;

  if (ip) {
    const geo = geoip.lookup(ip);
    locationCity = geo?.city || null;
    locationCountry = geo?.country || null;
  }

  const session = await prisma.session.create({
    data: {
      userId,
      ip,
      userAgent,
      fingerprint,
      deviceName,
      platform,
      browser,
      locationCity,
      locationCountry,
      firstSeenAt: now,
      lastUsedAt: now,
      lastActiveAt: now,
      expiresAt,
    },
  });

  await logAuthEvent({
    userId,
    event: "session_created",
    ip,
    userAgent,
    platform,
    browser,
    locationCity: locationCity ?? undefined,
    locationCountry: locationCountry ?? undefined,
  });

  return session;
}

export async function updateSessionTimestamps(sessionId: string) {
  const now = new Date();

  return prisma.session.update({
    where: { id: sessionId },
    data: {
      lastActiveAt: now,
      lastUsedAt: now,
    },
  });
}

export class SessionService {
  async getAllSessions(userId: string) {
    return await prisma.session.findMany({
      where: { userId, valid: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async getSessionById(userId: string, sessionId: string) {
    const session = await prisma.session.findFirst({
      where: { id: sessionId, userId, valid: true },
    });
    if (!session) throw new NotFoundException("Session not found");
    return session;
  }

  async deleteSessionById(userId: string, sessionId: string) {
    const session = await prisma.session.findFirst({
      where: { id: sessionId, userId, valid: true },
    });
    if (!session) throw new NotFoundException("Session not found");
    await prisma.session.update({ where: { id: sessionId }, data: { valid: false } });
  }

  async deleteAllSessions(userId: string) {
    await prisma.session.updateMany({ where: { userId, valid: true }, data: { valid: false } });
  }

  async revokeSessionById(userId: string, sessionId: string) {
    const session = await prisma.session.findFirst({
      where: { id: sessionId, userId, valid: true },
    });
    if (!session) throw new NotFoundException("Session not found");
    await prisma.session.update({ where: { id: sessionId }, data: { valid: false } });
  }

  async revokeAllSessions(userId: string) {
    await prisma.session.updateMany({ where: { userId, valid: true }, data: { valid: false } });
  }
}
