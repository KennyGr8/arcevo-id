export interface MFAAdapter {
  id: String;
  userId: String;
  user: any;
  secret: String;
  enabled: Boolean;
  verifiedAt?: DateTime;
  createdAt: DateTime;
  backupCodes: any;
}
