import type { IUserAdapter } from "@interfaces/database";
import type { UserAdapter } from "@contracts/generated/types";
import { prisma } from "@database";
import type { UserModel } from "@database/prisma";

export class PrismaUserAdapter implements IUserAdapter<UserAdapter> {
  async findAll(): Promise<UserAdapter[]> {
    const users = await prisma.user.findMany();
    return users.map(this.toModel);
  }

  async findById(id: string): Promise<UserAdapter | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user ? this.toModel(user) : null;
  }

  private toModel(user: UserModel): UserAdapter {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
