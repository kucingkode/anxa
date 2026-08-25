import { api } from "@/lib/api";
import type { LoginRequest, LoginResponse } from "@simk/contracts";

export async function loginUser(payload: LoginRequest): Promise<LoginResponse> {
  const { data, error } = await api.POST("/v1/auth/login", { body: payload });
  if (error) throw new Error((error as { message?: string }).message ?? "Login failed");
  return data as LoginResponse;
}