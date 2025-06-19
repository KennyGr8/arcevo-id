import { ExtractJwt, Strategy as JwtStrategy, StrategyOptionsWithRequest } from "passport-jwt";
import { UnauthorizedException } from "@utils";
import { ErrorCode } from "@enums/error-code.enum";
import { config } from "@database/config/app.config";
import passport, { PassportStatic } from "passport";
import { SafeUser } from "@/@types/user";
import { userService } from "@services/user.service";

interface JwtPayload {
  userId: string;
  sessionId: string;
}

const options: StrategyOptionsWithRequest = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => {
      const accessToken = req.cookies.accessToken;
      if (!accessToken) {
        throw new UnauthorizedException(
          "Unauthorized access token",
          ErrorCode.AUTH_TOKEN_NOT_FOUND
        );
      }
      return accessToken;
    },
  ]),
  secretOrKey: config.JWT.SECRET,
  audience: ["user"],
  algorithms: ["HS256"],
  passReqToCallback: true,
};

export const setupJwtStrategy = (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(options, async (req, payload: JwtPayload, done) => {
      try {
        const user = await userService.findUserById(payload.userId);
        if (!user) return done(null, false);

        // Create SafeUser manually
        const safeUser: SafeUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };

        req.sessionId = payload.sessionId;
        return done(null, safeUser);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};

export const authenticateJWT = passport.authenticate("jwt", { session: false });
