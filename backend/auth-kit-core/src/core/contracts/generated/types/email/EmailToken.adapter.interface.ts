export interface EmailTokenAdapter {
  id: String;
  email: String;
  token: String;
  type: TokenType;
  expiresAt: DateTime;
  userId?: String;
  user?: any;
  createdAt: DateTime;
}
