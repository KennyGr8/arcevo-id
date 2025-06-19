export interface SessionAdapter {
  id: String;
  userId: String;
  user: any;
  ip?: String;
  userAgent?: String;
  deviceName?: String;
  platform?: String;
  browser?: String;
  locationCity?: String;
  locationCountry?: String;
  fingerprint?: String;
  createdAt: DateTime;
  lastActiveAt?: DateTime;
  expiresAt: DateTime;
  valid: Boolean;
  refreshToken?: String;
  firstSeenAt?: DateTime;
  lastUsedAt?: DateTime;
}
