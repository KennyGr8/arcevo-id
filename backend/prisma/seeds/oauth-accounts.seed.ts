import { prisma } from "../../auth-kit-core/src/database/prisma";

export default async function seedOAuthAccounts() {
  console.log("⏳ Seeding OAuth accounts...");

  await prisma.oAuthAccount.createMany({
    data: [
    {
      userId: "user-1",
      provider: "GITHUB",
      providerUserId: "github-user-1",
      accessToken: "mock_access_token",
      refreshToken: "mock_refresh_token",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60),
    },
    {
      userId: "premium-1",
      provider: "GITHUB",
      providerUserId: "github-premium-1",
      accessToken: "mock_access_token",
      refreshToken: "mock_refresh_token",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60),
    },
  ],
    skipDuplicates: true,
  });

  console.log("✅ OAuth accounts seeded.");
}
