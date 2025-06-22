import { mongo } from "@database";
import type { IEmailTokenAdapter } from "@interfaces/database";
import type { EmailTokenDTO, EmailTokenAdapter } from "@contracts/generated/types";
import { TokenType } from "@prisma-enums";

export const MongoEmailTokenAdapter: IEmailTokenAdapter<EmailTokenAdapter> = {
  async createToken(data) {
    await mongo.collection("email_tokens").insertOne(data);
    return data;
  },
  async findValidToken(token, type: TokenType) {
    return mongo.collection<EmailTokenAdapter>("email_tokens").findOne({ token, type, valid: true });
  },
  async invalidateToken(token) {
    await mongo.collection("email_tokens").updateOne({ token }, { $set: { valid: false } });
  },
  async getTokensForEmail(email, type?) {
    const query: any = { email };
    if (type) query.type = type;
    return mongo.collection<EmailTokenAdapter>("email_tokens").find(query).toArray();
  }
};
