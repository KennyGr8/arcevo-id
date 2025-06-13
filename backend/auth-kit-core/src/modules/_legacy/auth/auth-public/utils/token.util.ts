import { signJwtToken, verifyJwtToken, accessTokenSignOptions, refreshTokenSignOptions } from "../../../common/utils/jwt";

export function signAuthTokens(userId: string, sessionId: string) {
  const accessToken = signJwtToken({ userId, sessionId }, accessTokenSignOptions);
  const refreshToken = signJwtToken({ sessionId }, refreshTokenSignOptions);
  return { accessToken, refreshToken };
}

export function verifyRefreshToken(token: string) {
  return verifyJwtToken(token, refreshTokenSignOptions);
}
