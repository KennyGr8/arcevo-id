import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { AppError } from "@utils";
import { HTTPSTATUS } from "@database/configs/http.config";

export const validateRequest = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errorDetails = result.error.format();
      throw new AppError("Validation failed", HTTPSTATUS.BAD_REQUEST, errorDetails);
    }
    next();
  };
};
