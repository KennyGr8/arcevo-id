export const featureFlags = {
  auth: {
    emailPasswordLogin: true,
    magicLinkLogin: true,
    socialLogin: true,
    sessionManagement: true,
    jwtTokens: true,
    refreshTokens: true,
    sessionRevocation: true,
    emailVerification: true,
    passwordReset: true,
    rateLimiting: true,
    totpMfa: true,
    backupCodes: false, // planned
    webAuthn: false, // planned
    smsMfa: false, // planned
    userCrud: true,
    adminView: true,
    blockUser: true,
    linkedAccounts: true,
    userInvites: false, // planned
    auditLogs: true,
    sessionListing: true,
    deviceTracking: true,
    geoIpTracking: true,
  },
  billing: {
    stripe: true,
    usageMetering: false, // planned
    premiumFeatures: true,
  },
  sso: {
    saml: false, // planned
    teamManagement: false, // planned
  },
};
