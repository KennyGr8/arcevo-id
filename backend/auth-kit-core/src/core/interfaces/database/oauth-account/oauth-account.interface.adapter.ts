import * as DTO from "./oauth-account.dto";

export interface IOAuthAccountAdapter<TModel = unknown> {
  createOAuthAccount(data: DTO.CreateOAuthAccountDto): Promise<TModel>;
  getAccountByProvider(provider: DTO.OAuthProvider, providerUserId: string): Promise<TModel | null>;
  getAllUserOAuthAccounts(userId: string): Promise<TModel[]>;
  deleteOAuthAccount(id: string): Promise<boolean>;
}
