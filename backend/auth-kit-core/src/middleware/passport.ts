// auth-kit-core/src/middleware/passport.ts

import passport from "passport";
import { setupJwtStrategy } from "@strategies/jwt.strategy";

const intializePassport = () => {
  setupJwtStrategy(passport);
};

intializePassport();
export default passport;
