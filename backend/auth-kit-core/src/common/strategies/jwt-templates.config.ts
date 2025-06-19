import { AccessTokenPayload } from "@utils";

export type JwtClaimTemplate = (
  payload: AccessTokenPayload
) => Record<string, unknown>;

export const jwtTemplates: Record<string, JwtClaimTemplate> = {
  blank: (payload) => ({
    sub: payload.userId,
    sessionId: payload.sessionId,
  }),

  hasura: (payload) => ({
    sub: payload.userId,
    "https://hasura.io/jwt/claims": {
      "x-hasura-user-id": payload.userId,
      "x-hasura-role": "user",
      "x-hasura-allowed-roles": ["user", "admin"],
    },
  }),

  supabase: (payload) => ({
    sub: payload.userId,
    email: "user@example.com", // replace dynamically
    role: "authenticated",
    app_metadata: {
      provider: "email",
      providers: ["email"],
    },
    user_metadata: {},
  }),

  nhost: (payload) => ({
    sub: payload.userId,
    "https://nhost.io/jwt/claims": {
      "x-hasura-user-id": payload.userId,
      "x-hasura-default-role": "user",
      "x-hasura-allowed-roles": ["user", "admin"],
    },
  }),

  convex: (payload) => ({
    sub: payload.userId,
    role: "user",
    convexUserId: payload.userId,
  }),

  firebase: (payload) => ({
    sub: payload.userId,
    user_id: payload.userId,
    firebase: {
      identities: {
        email: ["user@example.com"], // override as needed
      },
      sign_in_provider: "custom",
    },
  }),

  mongodb: (payload) => ({
    sub: payload.userId,
    "https://realm.mongodb.com/claims": {
      user_id: payload.userId,
      roles: ["default"],
    },
  }),

  neon: (payload) => ({
    sub: payload.userId,
    database_roles: ["read_only"], // example role
    db_user: payload.userId,
  }),

  fauna: (payload) => ({
    sub: payload.userId,
    "https://fauna.com/claims": {
      roles: ["user"],
    },
  }),

  appwrite: (payload) => ({
    sub: payload.userId,
    "https://appwrite.io/jwt/claims": {
      id: payload.userId,
      roles: ["user"],
    },
  }),

  grafbase: (payload) => ({
    sub: payload.userId,
    "https://grafbase.com/jwt/claims": {
      "x-grafbase-user-id": payload.userId,
      "x-grafbase-role": "user",
    },
  }),

  custom: (payload) => ({
    sub: payload.userId,
    sessionId: payload.sessionId,
    role: "user",
    project: "custom-app",
    featureFlags: {
      newDashboard: true,
    },
  }),
};
