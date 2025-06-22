import type { AdapterRegistry } from "@/@types/adapter-registry";

import { PrismaAdapterRegistry } from "./register/prisma";
import { MongoAdapterRegistry } from "./register/mongo";
import { ConvexAdapterRegistry } from "./register/convex";
import { NeonAdapterRegistry } from "./register/neon";

// import { SupabaseAdapterRegistry } from "./register/supabase";
// import { FirebaseAdapterRegistry } from "./register/firebase";
// import { CustomAdapterRegistry } from "./register/custom";

/**
 * All supported providers and their registry bindings.
 * Add/remove from here to extend support.
 */
export const adapter: Record<DatabaseProvider, AdapterRegistry> = {
  prisma: PrismaAdapterRegistry,
  mongo: MongoAdapterRegistry,
  convex: ConvexAdapterRegistry,

  // Future support
  // neon: NeonAdapterRegistry,
  // supabase: SupabaseAdapterRegistry,
  // firebase: FirebaseAdapterRegistry,
  // custom: CustomAdapterRegistry,
};

export type DatabaseProvider = keyof typeof adapter;
