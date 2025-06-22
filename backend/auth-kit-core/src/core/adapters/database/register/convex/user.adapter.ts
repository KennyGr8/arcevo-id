import { db } from "@database";
import type { IUserAdapter } from "@interfaces/database";
import type { UserAdapter } from "@contracts/generated/types";

export const ConvexUserAdapter: IUserAdapter<UserAdapter> = {
  async findAll() {
    return db.query("users");
  },
  async findById(id) {
    return db.get("users", id);
  },
  async findByEmail(email) {
    return db.first("users", q => q.eq(q.field("email"), email));
  },
  async create(data) {
    const id = await db.insert("users", data);
    return { ...data, id };
  },
  async update(id, data) {
    await db.patch("users", id, data);
    return this.findById(id);
  },
  async delete(id) {
    await db.delete("users", id);
  }
};
