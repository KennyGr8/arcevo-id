import { IUserAdapter } from '@interfaces/user.adapter.interface'
import { ISessionAdapter } from '@interfaces/session.adapter.interface'
// ... other interfaces

import * as PrismaAdapters from '@adapters/prisma'
// Later you can import MongoAdapters, SupabaseAdapters...

// Simulate getting this from env/config
const DB_PROVIDER = process.env.DB_PROVIDER || 'prisma'

export const AdapterRegistry = {
  user: PrismaAdapters.userAdapter as IUserAdapter,
  session: PrismaAdapters.sessionAdapter as ISessionAdapter,
  // ... other adapters
}
