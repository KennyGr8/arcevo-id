export interface MFA_BackupCodeAdapter {
  id: String;
  code: String;
  usedAt?: DateTime;
  mfaId: String;
  mfa: any;
}
