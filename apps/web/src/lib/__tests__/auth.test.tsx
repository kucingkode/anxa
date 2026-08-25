import { render, screen, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthProvider, useAuth } from "../auth";
import { getAccessToken, setAccessToken } from "../token-store";

vi.mock("../api", () => ({
  api: { POST: vi.fn() },
  shouldRedirectOnUnauthorized: () => false,
  clearAuth: () => setAccessToken(null),
  redirectToLogin: () => {},
}));

import { api } from "../api";

const user = {
  id: "1",
  email: "test@simk.dev",
  role: {
    id: "r1",
    name: "admin",
    permissions: ["users:read", "users:write"],
    isSystem: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
};

function AuthStatus() {
  const { isAuthenticated, user: currentUser, login, logout } = useAuth();
  return (
    <div>
      <span>{isAuthenticated ? "authenticated" : "unauthenticated"}</span>
      <span>{currentUser?.email ?? "none"}</span>
      <button onClick={() => login({ accessToken: "new-token", user })}>login</button>
      <button onClick={() => void logout()}>logout</button>
    </div>
  );
}

function renderAuth() {
  return render(
    <AuthProvider>
      <AuthStatus />
    </AuthProvider>,
  );
}

describe("AuthProvider", () => {
  beforeEach(() => {
    setAccessToken(null);
    vi.mocked(api.POST).mockReset();
  });

  it("becomes authenticated when refresh succeeds", async () => {
    vi.mocked(api.POST).mockResolvedValue({
      data: { accessToken: "tok", user },
      error: undefined,
    } as never);

    renderAuth();

    await waitFor(() => expect(screen.getByText("authenticated")).toBeInTheDocument());
    expect(getAccessToken()).toBe("tok");
    expect(screen.getByText("test@simk.dev")).toBeInTheDocument();
  });

  it("becomes unauthenticated when refresh fails", async () => {
    vi.mocked(api.POST).mockResolvedValue({
      error: { message: "no cookie" },
      response: new Response(),
    } as never);

    renderAuth();

    await waitFor(() => expect(screen.getByText("unauthenticated")).toBeInTheDocument());
    expect(getAccessToken()).toBeNull();
  });

  it("login sets the in-memory token and authenticated state", async () => {
    vi.mocked(api.POST).mockResolvedValue({
      error: { message: "no cookie" },
      response: new Response(),
    } as never);

    renderAuth();
    await waitFor(() => expect(screen.getByText("unauthenticated")).toBeInTheDocument());

    await userEvent.click(screen.getByRole("button", { name: "login" }));

    expect(screen.getByText("authenticated")).toBeInTheDocument();
    expect(getAccessToken()).toBe("new-token");
  });

  it("logout clears the in-memory token and state", async () => {
    vi.mocked(api.POST)
      .mockResolvedValueOnce({ data: { accessToken: "tok", user }, error: undefined } as never)
      .mockResolvedValueOnce({ data: undefined, error: undefined } as never);

    renderAuth();
    await waitFor(() => expect(screen.getByText("authenticated")).toBeInTheDocument());

    await userEvent.click(screen.getByRole("button", { name: "logout" }));

    await waitFor(() => expect(screen.getByText("unauthenticated")).toBeInTheDocument());
    expect(getAccessToken()).toBeNull();
  });

  it("throws when useAuth is used outside AuthProvider", () => {
    expect(() => renderHook(() => useAuth())).toThrow("useAuth must be used within AuthProvider");
  });
});
