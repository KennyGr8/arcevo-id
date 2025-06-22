// backend/auth-kit-core/tests/adapters/user.adapter.test.ts

import { getDB } from "@/core/database";

describe.each(["prisma", "mongo", "convex"])("UserAdapter - %s", (provider) => {
  const db = getDB(provider as any);

  it("creates and finds a user", async () => {
    const data = { id: "u1", email: `user-${provider}@x.dev` };
    await db.user.create(data);

    const found = await db.user.findById("u1");
    expect(found?.email).toBe(data.email);
  });

  afterAll(async () => {
    // Cleanup logic if needed
  });
});
