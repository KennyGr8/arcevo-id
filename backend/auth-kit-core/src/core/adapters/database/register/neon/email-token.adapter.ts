import type { IEmailTokenAdapter } from "@interfaces/database";
import type { EmailTokenModel } from "@contracts/generated/types";
import { insertInto } from "@database/utils/neon-query";
import { neon } from "@database";
import { TokenType } from "@prisma-enums";

export const NeonEmailTokenAdapter: IEmailTokenAdapter<EmailTokenModel> = {
  async createToken(data) {
    return insertInto("email_token", data);
  },

  async findValidToken(token, type: TokenType) {
    const { rows } = await neon.query(
      `SELECT * FROM "email_token" WHERE token = $1 AND type = $2 AND expires > now() AND valid = true`,
      [token, type]
    );
    return rows[0] ?? null;
  },

  async invalidateToken(token) {
    await neon.query(
      `UPDATE "email_token" SET valid = false WHERE token = $1`,
      [token]
    );
  },

  async getTokensForEmail(email, type?) {
    const query = type
      ? `SELECT * FROM "email_token" WHERE email = $1 AND type = $2 ORDER BY "createdAt" DESC`
      : `SELECT * FROM "email_token" WHERE email = $1 ORDER BY "createdAt" DESC`;
    const { rows } = await neon.query(query, type ? [email, type] : [email]);
    return rows;
  },
};
