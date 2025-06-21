// core/adapters/database/registry.ts

import { ConvexAdapterRegistry } from "./register/convex"; // dynamic in future
import { CustomAdapterRegistry } from "./register/custom"; // dynamic in future
import { FirebaseAdapterRegistry } from "./register/firebase"; // dynamic in future
import { MongoAdapterRegistry } from "./register/mongo"; // dynamic in future
import { NeonAdapterRegistry } from "./register/neon"; // dynamic in future
import { PrismaAdapterRegistry } from "./register/prisma"; // dynamic in future
import { SupabaseAdapterRegistry } from "./register/supabase"; // dynamic in future

export const adapter = {
  convex: ConvexAdapterRegistry,
  custom: CustomAdapterRegistry,
  firebase: FirebaseAdapterRegistry,
  mongo: MongoAdapterRegistry,
  neon: NeonAdapterRegistry,
  prisma: PrismaAdapterRegistry,
  supabase: SupabaseAdapterRegistry,
}