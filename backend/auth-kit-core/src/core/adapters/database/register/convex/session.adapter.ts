import { db } from "@database";
import type { ISessionAdapter } from "@interfaces/database";
import type { SessionAdapter } from "@contracts/generated/types";

export const ConvexSessionAdapter: ISessionAdapter<SessionAdapter> = {
  async findAllByUser(userId) {
    return db.filter("sessions", q => q.eq(q.field("userId"), userId));
  },
  async findById(id) {
    return db.get("sessions", id);
  },
  async create(data) {
    const id = await db.insert("sessions", data);
    return { ...data, id };
  },
  async update(id, data) {
    await db.patch("sessions", id, data);
    return this.findById(id);
  },
  async delete(id) {
    await db.delete("sessions", id);
  },
  async revokeAll(userId) {
    const sessions = await db.filter("sessions", q => q.eq(q.field("userId"), userId));
    for (const s of sessions) await db.delete("sessions", s.id);
    return sessions.length;
  },
  async revokeCurrent(id) {
    await db.delete("sessions", id);
  }
};
