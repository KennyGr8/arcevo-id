import { IUserAdapter } from "@/auth-kit-core/core/interfaces/user.adapter";
import { api } from "./convex/_generated/api";
import { client } from "./convex/client";

export const ConvexUserAdapter: IUserAdapter = {
  async findByEmail(email) {
    return await client.query(api.users.findByEmail, { email });
  },
  async createUser(data) {
    return await client.mutation(api.users.create, data);
  },
  // ...
};
