import type { Visit } from "@simk/contracts";
import type { FastifyApp } from "../create-app.js";
import type { FastifyRestServerDeps } from "../deps.js";
import { permission } from "../../../../../domain/permissions.js";
import { createAuthMiddleware, requirePermission } from "../middleware/auth.js";

export function visitsRoutes(deps: FastifyRestServerDeps) {
  return async (app: FastifyApp) => {
    const auth = createAuthMiddleware({
      verifyTokenService: deps.verifyTokenService,
      getAuthUserService: deps.getAuthUserService,
    });
    const canRead = requirePermission(permission("visits", "read"));

    app.get("/", { preHandler: [auth, canRead] }, async (req, reply) => {
      const raw = req.query as {
        limit?: string;
        offset?: string;
        patientId?: string;
        status?: string;
      };
      const limit = Math.min(Math.max(Number(raw.limit) || 20, 1), 100);
      const offset = Math.max(Number(raw.offset) || 0, 0);

      const visits = await deps.listVisitsService.listVisits({
        limit,
        offset,
        patientId: raw.patientId,
        status: raw.status as Visit["status"] | undefined,
      });

      return reply.send(visits);
    });

    app.get("/:visitId", { preHandler: [auth, canRead] }, async (req, reply) => {
      const { visitId } = req.params as { visitId: string };
      const visit = await deps.getVisitService.getVisit({ id: visitId });
      return reply.send(visit);
    });
  };
}
