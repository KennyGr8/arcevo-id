export type CreateSSOProviderDto = {
  organizationId: string;
  provider: string;
  ssoConfig: Record<string, any>;
};
