import { mongo } from "@database";
import type { IUserAdapter } from "@interfaces/database";
import type { UserDTO, UserAdapter } from "@contracts/generated/user";

export const MongoUserAdapter: IUserAdapter<UserAdapter> = {
  async findAll() {
    return mongo.collection<UserAdapter>("users").find().toArray();
  },
  async findById(id) {
    return mongo.collection<UserAdapter>("users").findOne({ id });
  },
  async findByEmail(email) {
    return mongo.collection<UserAdapter>("users").findOne({ email });
  },
  async create(data) {
    await mongo.collection("users").insertOne(data);
    return data;
  },
  async update(id, data) {
    await mongo.collection("users").updateOne({ id }, { $set: data });
    return this.findById(id);
  },
  async delete(id) {
    await mongo.collection("users").deleteOne({ id });
  }
};