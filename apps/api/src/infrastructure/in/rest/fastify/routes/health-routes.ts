import type { FastifyApp } from "../create-app.js";
import type { FastifyRestServerDeps } from "../deps.js";

export function healthRoutes(_deps: FastifyRestServerDeps) {
  return async (app: FastifyApp) => {
    app.get("/v1/health", async () => {
      return { status: "ok" as const, uptime: process.uptime() };
    });
  };
}
