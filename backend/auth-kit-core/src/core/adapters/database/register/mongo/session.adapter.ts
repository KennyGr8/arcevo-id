import { mongo } from "@database";
import type { ISessionAdapter } from "@interfaces/database";
import type { SessionDTO, SessionAdapter } from "@contracts/generated/session";

export const MongoSessionAdapter: ISessionAdapter<SessionAdapter> = {
  async findAllByUser(userId) {
    return mongo.collection<SessionAdapter>("sessions").find({ userId }).toArray();
  },
  async findById(id) {
    return mongo.collection<SessionAdapter>("sessions").findOne({ id });
  },
  async create(data) {
    await mongo.collection("sessions").insertOne(data);
    return data;
  },
  async update(id, data) {
    await mongo.collection("sessions").updateOne({ id }, { $set: data });
    return this.findById(id);
  },
  async delete(id) {
    await mongo.collection("sessions").deleteOne({ id });
  },
  async revokeAll(userId) {
    const res = await mongo.collection("sessions").deleteMany({ userId });
    return res.deletedCount ?? 0;
  },
  async revokeCurrent(id) {
    await mongo.collection("sessions").deleteOne({ id });
  }
};