// common/validators/mfa.validator.ts
import { z } from "zod";
import { TokenTypeEnum } from "../constants/prisma-enums/role.enum";

// Allowed MFA delivery methods
export const MfaMethodEnum = z.enum(["totp", "sms", "email"]);

export const verifyMfaSchema = z.object({
  method: MfaMethodEnum.default("totp"),
  token: z
    .string()
    .min(6, "MFA token must be at least 6 digits")
    .max(10, "MFA token must be at most 10 digits")
    .regex(/^\d+$/, "MFA token must contain only digits"),
  type: z.nativeEnum(TokenTypeEnum).default("TOTP"), // match to prisma TokenType enum
});

export const verifyMfaForLoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  method: MfaMethodEnum.default("totp"),
  token: z
    .string()
    .min(6, "MFA token must be at least 6 digits")
    .max(10, "MFA token must be at most 10 digits")
    .regex(/^\d+$/, "MFA token must contain only digits"),
  type: z.literal("TOTP"), // This login-specific flow only accepts TOTP
});

