import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { AuthUser, LoginResponse } from "@simk/contracts";
import { api } from "./api";
import { setAccessToken } from "./token-store";

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  status: "loading" | "ready";
}

interface AuthContextValue extends AuthState {
  login: (response: LoginResponse) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const UNAUTHENTICATED: AuthState = {
  user: null,
  isAuthenticated: false,
  status: "ready",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    status: "loading",
  });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { data, error } = await api.POST("/v1/auth/refresh");
        if (cancelled) return;

        if (error || !data) {
          setAccessToken(null);
          setState(UNAUTHENTICATED);
          return;
        }

        setAccessToken(data.accessToken);
        setState({
          user: data.user,
          isAuthenticated: true,
          status: "ready",
        });
      } catch {
        if (!cancelled) {
          setAccessToken(null);
          setState(UNAUTHENTICATED);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback((response: LoginResponse) => {
    setAccessToken(response.accessToken);
    setState({
      user: response.user,
      isAuthenticated: true,
      status: "ready",
    });
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.POST("/v1/auth/logout");
    } catch {
      // Ignore network/server errors — force local logout regardless.
    }
    setAccessToken(null);
    setState(UNAUTHENTICATED);
  }, []);

  if (state.status === "loading") {
    return null;
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
