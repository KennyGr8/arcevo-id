import { db } from "@database";
import type { IEmailTokenAdapter } from "@interfaces/database";
import type { EmailTokenAdapter } from "@contracts/generated/types";
import type { TokenType } from "@prisma-enums";

export const ConvexEmailTokenAdapter: IEmailTokenAdapter<EmailTokenAdapter> = {
  async createToken(data) {
    const id = await db.insert("email_tokens", data);
    return { ...data, id };
  },
  async findValidToken(token, type) {
    return db.first("email_tokens", q => q.eq(q.field("token"), token).eq(q.field("type"), type));
  },
  async invalidateToken(token) {
    const found = await db.first("email_tokens", q => q.eq(q.field("token"), token));
    if (found) await db.delete("email_tokens", found.id);
  },
  async getTokensForEmail(email, type) {
    return db.filter("email_tokens", q => {
      let cond = q.eq(q.field("email"), email);
      if (type) cond = q.and(cond, q.eq(q.field("type"), type));
      return cond;
    });
  }
};
