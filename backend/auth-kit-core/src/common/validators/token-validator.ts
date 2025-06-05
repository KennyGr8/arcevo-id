import { z } from "zod";
import { TokenTypeEnum } from "../constants/prisma-enums/role.enum";

export const tokenTypeSchema = z.nativeEnum(TokenTypeEnum);

export const validateTokenSchema = z.object({
  token: z.string().min(6),
  type: tokenTypeSchema,
});
