export interface ActivityLogAdapter {
  id: String;
  userId: String;
  user: any;
  action: ActivityType;
  ip?: String;
  metadata?: Json;
  userAgent?: String;
  createdAt: DateTime;
}
