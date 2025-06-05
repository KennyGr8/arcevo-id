import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { config } from "@database/config/app.config";
import { jwtTemplates } from "@strategies/jwt-templates.config";

export type AccessTokenPayload = {
  userId: string; // UUID (Prisma default for user.id)
  sessionId: string; // UUID or numeric depending on Prisma model
};

export type RefreshTokenPayload = {
  sessionId: string;
};

type SignOptionsWithSecret = SignOptions & {
  secret: string;
};

// Default token audience
const defaultOptions: SignOptions = {
  audience: ["user"],
};

// Access token sign options
export const accessTokenSignOptions: SignOptionsWithSecret = {
  expiresIn: parseInt(config.JWT.EXPIRES_IN, 10),
  secret: config.JWT.SECRET,
};

// Refresh token sign options
export const refreshTokenSignOptions: SignOptionsWithSecret = {
  expiresIn: parseInt(config.JWT.REFRESH_EXPIRES_IN, 10),
  secret: config.JWT.REFRESH_SECRET,
};

// Sign a JWT token
export const signJwtToken = (
  payload: AccessTokenPayload | RefreshTokenPayload,
  options: SignOptionsWithSecret = accessTokenSignOptions
) => {
  const { secret, ...opts } = options;
  return jwt.sign(payload, secret, {
    ...defaultOptions,
    ...opts,
  });
};

// Verify a JWT token
export const verifyJwtToken = <TPayload extends object = AccessTokenPayload>(
  token: string,
  options?: VerifyOptions & { secret?: string }
) => {
  try {
    const { secret = config.JWT.SECRET, ...opts } = options || {};
    const payload = jwt.verify(token, secret, {
      ...defaultOptions,
      ...opts,
    }) as TPayload;
    return { payload };
  } catch (err: any) {
    return {
      error: err.message,
    };
  }
};

export const signJwtTokenWithTemplate = (
  payload: AccessTokenPayload,
  templateKey: keyof typeof jwtTemplates = "blank",
  options: SignOptionsWithSecret = accessTokenSignOptions
) => {
  const { secret, ...opts } = options;
  const claims = jwtTemplates[templateKey](payload);
  return jwt.sign(claims, secret, {
    ...defaultOptions,
    ...opts,
  });
};
