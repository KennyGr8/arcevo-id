// oauth-account.dto.ts

import type { OAuthProvider } from "@prisma-enums/oauth-provider.enum";

export type CreateOAuthAccountDto = {
  userId: string;
  provider: OAuthProvider;
  providerUserId: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: Date;
};

export type OAuthProvider = OAuthProvider;
