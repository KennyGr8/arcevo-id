import { z } from "zod";
import { forgotPasswordSchema, resetPasswordSchema } from "./password.zod";

export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;
