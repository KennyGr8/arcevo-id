import { prisma } from "../../auth-kit-core/src/database/prisma";

export async function seedSessions() {
  console.log("⏳ Seeding sessions...");

  await prisma.session.createMany({
    data: [
      {
        id: "session-1",
        userId: "user-1",
        ip: "127.0.0.1",
        userAgent: "Seed Agent",
        deviceName: "Test Device",
        platform: "Windows",
        browser: "Chrome",
        locationCity: "Lagos",
        locationCountry: "Nigeria",
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
      },
      {
        id: "session-2",
        userId: "premium-1",
        ip: "127.0.0.1",
        userAgent: "Seed Agent",
        deviceName: "Test Device",
        platform: "Windows",
        browser: "Chrome",
        locationCity: "Lagos",
        locationCountry: "Nigeria",
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Sessions seeded.");
}
