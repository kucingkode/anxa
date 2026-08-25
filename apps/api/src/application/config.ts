import type { LogLevel } from "../observability/logging.js";

export type SatuSehatConfig = {
  baseUrl: string;
  authUrl: string;
  clientId: string;
  clientSecret: string;
  organizationId: string;
};

export type DatabaseConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  ssl: boolean;
};

export type RedisConfig = {
  host: string;
  port: number;
};

export type AppConfig = {
  host: string;
  port: number;
  logLevel: LogLevel;
  database: DatabaseConfig;
  redis: RedisConfig;
  satusehat: SatuSehatConfig;
  jwt: JwtConfig;
  refreshTokenTtlSeconds: number;
  admin: SeedAdminConfig;
  cookieSecure: boolean;
};

export type JwtConfig = {
  secret: string;
  expiresIn: string;
};

export type SeedAdminConfig = {
  email: string;
  password: string;
  name?: string;
};

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  return {
    host: env.HOST ?? "0.0.0.0",
    port: Number(env.PORT ?? 3000),
    logLevel: (env.LOG_LEVEL as LogLevel | undefined) ?? "info",
    database: {
      host: env.DB_HOST ?? "localhost",
      port: Number(env.DB_PORT ?? 5432),
      user: env.DB_USER ?? "postgres",
      password: env.DB_PASSWORD ?? "postgres",
      database: env.DB_DATABASE ?? "simk",
      ssl: env.DB_SSL === "true",
    },
    redis: {
      host: env.REDIS_HOST ?? "localhost",
      port: Number(env.REDIS_PORT ?? 6379),
    },
    satusehat: {
      baseUrl:
        env.SATUSEHAT_BASE_URL ??
        "https://api-satusehat.kemkes.go.id/fhir-r4/v1",
      authUrl:
        env.SATUSEHAT_AUTH_URL ??
        "https://api-satusehat.kemkes.go.id/oauth2/v1",
      clientId: env.SATUSEHAT_CLIENT_ID ?? "",
      clientSecret: env.SATUSEHAT_CLIENT_SECRET ?? "",
      organizationId: env.SATUSEHAT_ORGANIZATION_ID ?? "",
    },
    jwt: {
      secret: env.JWT_SECRET ?? "simk-dev-secret-change-in-production",
      expiresIn: env.JWT_EXPIRES_IN ?? "5m",
    },
    refreshTokenTtlSeconds: Number(env.REFRESH_TOKEN_TTL_SECONDS ?? 604800),
    admin: {
      email: env.ADMIN_EMAIL ?? "admin@simk.dev",
      password: env.ADMIN_PASSWORD ?? "password123",
      name: env.ADMIN_NAME,
    },
    cookieSecure: env.NODE_ENV === "production",
  };
}
