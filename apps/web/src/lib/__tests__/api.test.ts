import { beforeEach, describe, expect, it } from "vitest";
import { clearAuth, shouldRedirectOnUnauthorized } from "../api";
import { getAccessToken, setAccessToken } from "../token-store";

describe("shouldRedirectOnUnauthorized", () => {
  it("returns true for 401 with a token on a protected endpoint", () => {
    expect(shouldRedirectOnUnauthorized(401, "http://localhost:3000/v1/patients", true)).toBe(true);
  });

  it("returns false when no token is present", () => {
    expect(shouldRedirectOnUnauthorized(401, "http://localhost:3000/v1/patients", false)).toBe(false);
  });

  it("returns false for non-401 statuses", () => {
    expect(shouldRedirectOnUnauthorized(500, "http://localhost:3000/v1/patients", true)).toBe(false);
    expect(shouldRedirectOnUnauthorized(403, "http://localhost:3000/v1/patients", true)).toBe(false);
  });

  it("returns false for the login endpoint", () => {
    expect(shouldRedirectOnUnauthorized(401, "http://localhost:3000/v1/auth/login", true)).toBe(false);
  });

  it("returns false for the refresh endpoint", () => {
    expect(shouldRedirectOnUnauthorized(401, "http://localhost:3000/v1/auth/refresh", true)).toBe(false);
  });
});

describe("clearAuth", () => {
  beforeEach(() => setAccessToken(null));

  it("clears the in-memory access token", () => {
    setAccessToken("token");
    clearAuth();
    expect(getAccessToken()).toBeNull();
  });
});
