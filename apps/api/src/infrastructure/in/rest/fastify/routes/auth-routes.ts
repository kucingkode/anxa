import type { LoginRequest } from "@simk/contracts";
import type { FastifyApp } from "../create-app.js";
import type { FastifyRestServerDeps } from "../deps.js";

const REFRESH_COOKIE_NAME = "simk_refresh_token";

const loginSchema = {
  type: "object",
  required: ["email", "password"],
  additionalProperties: false,
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 8 },
  },
} as const;

export function authRoutes(deps: FastifyRestServerDeps) {
  return async (app: FastifyApp) => {
    const refreshCookieOptions = {
      httpOnly: true,
      sameSite: "lax" as const,
      path: "/",
      secure: deps.cookieSecure,
      maxAge: deps.refreshTokenTtlSeconds,
    };

    const setRefreshCookie = (reply: { setCookie: (name: string, value: string, opts: typeof refreshCookieOptions) => void }, token: string) => {
      reply.setCookie(REFRESH_COOKIE_NAME, token, refreshCookieOptions);
    };

    app.post(
      "/v1/auth/login",
      { schema: { body: loginSchema } },
      async (req, reply) => {
        const result = await deps.loginService.login(req.body as LoginRequest);
        setRefreshCookie(reply, result.refreshToken);
        return reply.send({ accessToken: result.accessToken, user: result.user });
      },
    );

    app.post("/v1/auth/refresh", async (req, reply) => {
      const refreshToken = (req.cookies ?? {})[REFRESH_COOKIE_NAME];
      if (!refreshToken) {
        return reply.status(401).send({
          statusCode: 401,
          error: "UNAUTHORIZED",
          message: "Missing refresh token",
        });
      }

      const result = await deps.refreshService.refreshToken({ refreshToken });
      setRefreshCookie(reply, result.refreshToken);
      return reply.send({ accessToken: result.accessToken, user: result.user });
    });

    app.post("/v1/auth/logout", async (req, reply) => {
      const header = req.headers.authorization;
      const accessToken = header?.startsWith("Bearer ") ? header.split(" ")[1] : undefined;
      const refreshToken = (req.cookies ?? {})[REFRESH_COOKIE_NAME];

      await deps.logoutService.logout({ accessToken, refreshToken });
      reply.clearCookie(REFRESH_COOKIE_NAME, { path: "/" });
      return reply.code(204).send();
    });
  };
}
