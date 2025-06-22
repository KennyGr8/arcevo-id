// src/database/convex.ts

import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { queryGeneric, mutationGeneric } from "convex/server";

// You'll use this in adapters: db.query(...), db.insert(...), etc.
export const db = {
  async query<T = unknown>(collection: keyof typeof api): Promise<T[]> {
    return await queryGeneric(collection);
  },
  async get<T = unknown>(collection: string, id: Id<any>): Promise<T | null> {
    return await queryGeneric(collection, (q: any) => q.eq(q.field("id"), id)).first();
  },
  async filter<T = unknown>(collection: string, filter: (q: any) => any): Promise<T[]> {
    return await queryGeneric(collection, filter).collect();
  },
  async first<T = unknown>(collection: string, filter: (q: any) => any): Promise<T | null> {
    return await queryGeneric(collection, filter).first();
  },
  async insert<T = unknown>(collection: string, data: any): Promise<Id<any>> {
    return await mutationGeneric(collection).invoke(data);
  },
  async patch<T = unknown>(collection: string, id: Id<any>, data: any): Promise<void> {
    await mutationGeneric(collection).invoke({ id, ...data });
  },
  async delete(collection: string, id: Id<any>): Promise<void> {
    await mutationGeneric(collection).invoke(id);
  }
};
