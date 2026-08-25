import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginForm } from "@/features/auth/components/login-form";
import { getAccessToken } from "@/lib/token-store";

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    if (getAccessToken()) throw redirect({ to: "/" });
  },
  component: LoginForm,
});