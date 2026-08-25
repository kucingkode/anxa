import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  auth,
  buildTestApp,
  getRoleId,
  loginAsAdmin,
} from "./utils/build-test-app.js";

describe("auth", () => {
  let app: Awaited<ReturnType<typeof buildTestApp>>;

  beforeEach(async () => {
    app = await buildTestApp();
  });

  afterEach(async () => {
    await app.close();
  });

  describe("POST /v1/auth/login", () => {
    async function login(email: string, password: string) {
      return app.inject({
        method: "POST",
        url: "/v1/auth/login",
        payload: { email, password },
      });
    }

    it("logs in with valid credentials and returns a JWT access token + user", async () => {
      const res = await login(ADMIN_EMAIL, ADMIN_PASSWORD);
      expect(res.statusCode).toBe(200);

      const body = res.json();
      expect(body).toHaveProperty("accessToken");
      expect(body).toHaveProperty("user");
      expect(body.user.email).toBe(ADMIN_EMAIL);
      expect(body.user.role.name).toBe("admin");
    });

    it("sets the refresh token in an httpOnly cookie, not the body", async () => {
      const res = await login(ADMIN_EMAIL, ADMIN_PASSWORD);
      expect(res.statusCode).toBe(200);

      const body = res.json();
      expect(body.refreshToken).toBeUndefined();

      const setCookie = res.headers["set-cookie"];
      expect(setCookie).toBeDefined();
      const cookieHeader = Array.isArray(setCookie) ? setCookie[0] : setCookie;
      expect(cookieHeader).toContain("simk_refresh_token=");
      expect(cookieHeader).toContain("HttpOnly");
    });

    it("returns 401 for invalid email", async () => {
      const res = await login("nonexistent@simk.dev", "password123");
      expect(res.statusCode).toBe(401);
      expect(res.json().error).toBe("INVALID_CREDENTIALS");
    });

    it("returns 401 for wrong password", async () => {
      const res = await login(ADMIN_EMAIL, "wrongpassword");
      expect(res.statusCode).toBe(401);
      expect(res.json().error).toBe("INVALID_CREDENTIALS");
    });
  });

  describe("POST /v1/auth/logout", () => {
    it("returns 204 after successful logout", async () => {
      const token = await loginAsAdmin(app);

      const res = await app.inject({
        method: "POST",
        url: "/v1/auth/logout",
        headers: auth(token),
      });
      expect(res.statusCode).toBe(204);
    });
  });

  describe("POST /v1/auth/refresh", () => {
    async function loginAndGetCookie(): Promise<string> {
      const res = await app.inject({
        method: "POST",
        url: "/v1/auth/login",
        payload: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
      });
      const setCookie = res.headers["set-cookie"] as string | string[];
      const cookieHeader = Array.isArray(setCookie) ? setCookie[0] : setCookie;
      return cookieHeader!.split(";")[0]!;
    }

    it("returns a new access token and user for a valid refresh cookie", async () => {
      const cookie = await loginAndGetCookie();

      const res = await app.inject({
        method: "POST",
        url: "/v1/auth/refresh",
        headers: { cookie },
      });

      expect(res.statusCode).toBe(200);
      const body = res.json();
      expect(body).toHaveProperty("accessToken");
      expect(body.user.email).toBe(ADMIN_EMAIL);
      expect(res.headers["set-cookie"]).toBeDefined();
    });

    it("returns 401 without a refresh cookie", async () => {
      const res = await app.inject({ method: "POST", url: "/v1/auth/refresh" });
      expect(res.statusCode).toBe(401);
    });

    it("returns 401 for an invalid refresh cookie", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/v1/auth/refresh",
        headers: { cookie: "simk_refresh_token=invalid-token" },
      });
      expect(res.statusCode).toBe(401);
    });

    it("rotates the refresh token on each refresh", async () => {
      const cookie = await loginAndGetCookie();

      const res = await app.inject({
        method: "POST",
        url: "/v1/auth/refresh",
        headers: { cookie },
      });

      expect(res.statusCode).toBe(200);
      const newSetCookie = res.headers["set-cookie"] as string | string[];
      const newCookie = (Array.isArray(newSetCookie) ? newSetCookie[0] : newSetCookie)!.split(";")[0]!;

      expect(newCookie).not.toBe(cookie);
      expect(newCookie).toContain("simk_refresh_token=");
    });

    it("revokes the refresh token on logout", async () => {
      const cookie = await loginAndGetCookie();

      const logoutRes = await app.inject({
        method: "POST",
        url: "/v1/auth/logout",
        headers: { cookie },
      });
      expect(logoutRes.statusCode).toBe(204);

      const refreshRes = await app.inject({
        method: "POST",
        url: "/v1/auth/refresh",
        headers: { cookie },
      });
      expect(refreshRes.statusCode).toBe(401);
    });
  });

  describe("auth middleware", () => {
    it("returns 401 when no authorization header is provided", async () => {
      const res = await app.inject({
        method: "GET",
        url: "/v1/users",
      });
      expect(res.statusCode).toBe(401);
    });

    it("returns 401 for invalid token", async () => {
      const res = await app.inject({
        method: "GET",
        url: "/v1/users",
        headers: { authorization: "Bearer invalid-token" },
      });
      expect(res.statusCode).toBe(401);
    });

    it("returns 401 for malformed authorization header", async () => {
      const res = await app.inject({
        method: "GET",
        url: "/v1/users",
        headers: { authorization: "malformed" },
      });
      expect(res.statusCode).toBe(401);
    });

    it("returns 403 when user lacks required role", async () => {
      const adminToken = await loginAsAdmin(app);
      const doctorRoleId = await getRoleId(app, "doctor");

      await app.inject({
        method: "POST",
        url: "/v1/users",
        payload: {
          name: "Doctor",
          email: "doctor@simk.dev",
          password: "password123",
          roleId: doctorRoleId,
        },
        headers: auth(adminToken),
      });

      const loginRes = await app.inject({
        method: "POST",
        url: "/v1/auth/login",
        payload: { email: "doctor@simk.dev", password: "password123" },
      });
      const token = loginRes.json().accessToken;

      const res = await app.inject({
        method: "GET",
        url: "/v1/users",
        headers: auth(token),
      });
      expect(res.statusCode).toBe(403);
    });
  });
});
