import authRoutes from './auth/auth.routes';
import sessionRoutes from './session/session.routes';
import mfaRoutes from './mfa/mfa.routes';
import billingRoutes from './billing/billing.routes';
import userRoutes from './user/user.routes';
// Import other route modules...

const routes = [
  ...authRoutes,
  ...sessionRoutes,
  ...mfaRoutes,
  ...billingRoutes,
  ...userRoutes,
  // Add more here...
];

export default routes;
