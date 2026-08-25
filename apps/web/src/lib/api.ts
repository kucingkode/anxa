import { createApiClient, DEFAULT_API_BASE_URL } from "@simk/contracts";
import { getAccessToken, setAccessToken } from "./token-store";

function getBaseUrl(): string {
  return import.meta.env.VITE_API_URL ?? DEFAULT_API_BASE_URL;
}

function getAuthHeaders(): Record<string, string> {
  const token = getAccessToken();
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

/**
 * Returns true when a `401` should force a logout + redirect to the login page.
 * We only do this when an access token was actually present (i.e. it expired /
 * was revoked) and never for the login/refresh endpoints themselves.
 */
export function shouldRedirectOnUnauthorized(status: number, url: string, hasToken: boolean): boolean {
  if (status !== 401) return false;
  if (!hasToken) return false;
  return !url.includes("/auth/login") && !url.includes("/auth/refresh");
}

export function clearAuth(): void {
  setAccessToken(null);
}

export function redirectToLogin(): void {
  if (window.location.pathname !== "/login") {
    window.location.assign("/login");
  }
}

export const api = createApiClient(getBaseUrl(), { credentials: "include" });

api.use({
  async onRequest({ request }) {
    const headers = getAuthHeaders();
    for (const [key, value] of Object.entries(headers)) {
      request.headers.set(key, value);
    }
    return request;
  },
  async onResponse({ request, response }) {
    const hasToken = Boolean(getAccessToken());
    if (shouldRedirectOnUnauthorized(response.status, request.url, hasToken)) {
      clearAuth();
      redirectToLogin();
    }
    return response;
  },
});
