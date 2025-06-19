// email-token.dto.ts

import { TokenType } from "@prisma-enums";

  export type CreateEmailTokenDto = {
    email: string;
    token: string;
    type: TokenType;
    expiresAt: Date;
    userId?: string;
  };
