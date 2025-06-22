import { mongo } from "@database";
import type { IAuthLogAdapter } from "@interfaces/database";
import type { AuthLogDTO, AuthLogAdapter } from "@contracts/generated/types";

export const MongoAuthLogAdapter: IAuthLogAdapter<AuthLogAdapter> = {
  async logActivity(data) {
    await mongo.collection("auth_logs").insertOne(data);
    return data;
  },
  async getByUser(userId) {
    return mongo.collection<AuthLogAdapter>("auth_logs").find({ userId }).toArray();
  }
};
