import type { IUserAdapter } from "@interfaces/database";
import type { UserAdapter } from "@contracts/generated/types";
import {
  findAll,
  findById,
  findByEmail,
  insertInto,
  updateById,
  deleteById,
} from "@database/utils/neon-query";

export const NeonUserAdapter: IUserAdapter<UserAdapter> = {
  async findAll() {
    return findAll("users");
  },

  async findById(id) {
    return findById("users", id);
  },

  async findByEmail(email) {
    return findByEmail("users", email);
  },

  async create(data) {
    return insertInto("users", data);
  },

  async update(id, data) {
    return updateById("users", id, data);
  },

  async delete(id) {
    return deleteById("users", id);
  },
};
