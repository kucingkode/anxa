import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/app-layout";
import { getAccessToken } from "@/lib/token-store";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: () => {
    const token = getAccessToken();
    if (!token) throw redirect({ to: "/login" });
  },
  component: () => <AppLayout />,
});