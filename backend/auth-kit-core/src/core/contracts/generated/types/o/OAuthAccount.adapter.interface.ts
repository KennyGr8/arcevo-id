export interface OAuthAccountAdapter {
  id: String;
  userId: String;
  user: any;
  provider: OAuthProvider;
  providerUserId: String;
  accessToken?: String;
  refreshToken?: String;
  expiresAt?: DateTime;
  createdAt: DateTime;
}
