import { TokenType } from "@prisma-enums";
import * as DTO from "./email-token.dto";

export interface IEmailTokenAdapter<TModel = unknown> {
  createToken(data: DTO.CreateEmailTokenDto): Promise<TModel>;
  findValidToken(token: string, type: TokenType): Promise<TModel | null>;
  invalidateToken(token: string): Promise<void>;
  getTokensForEmail(email: string, type?: TokenType): Promise<TModel[]>;
}
