export interface AuthLogAdapter {
  id: String;
  userId: String;
  user: any;
  event: AuthEvent;
  ip?: String;
  userAgent?: String;
  platform?: String;
  browser?: String;
  locationCity?: String;
  locationCountry?: String;
  createdAt: DateTime;
}
