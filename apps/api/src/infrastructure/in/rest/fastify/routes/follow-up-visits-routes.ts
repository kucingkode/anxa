import type {
  NewFollowUpVisit,
  FollowUpVisit,
  UpdateFollowUpVisit,
} from "@simk/contracts";
import type { FastifyApp } from "../create-app.js";
import type { FastifyRestServerDeps } from "../deps.js";
import { permission } from "../../../../../domain/permissions.js";
import { createAuthMiddleware, requirePermission } from "../middleware/auth.js";

const newFollowUpVisitSchema = {
  type: "object",
  required: ["patientId", "date"],
  additionalProperties: false,
  properties: {
    patientId: { type: "string", format: "uuid" },
    date: { type: "string", format: "date-time" },
    reason: { type: "string" },
  },
} as const;

const updateFollowUpVisitSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    date: { type: "string", format: "date-time" },
    status: {
      type: "string",
      enum: ["booked", "arrived", "fulfilled", "cancelled", "noshow"],
    },
    reason: { type: "string" },
  },
} as const;

export function followUpVisitsRoutes(deps: FastifyRestServerDeps) {
  return async (app: FastifyApp) => {
    const auth = createAuthMiddleware({
      verifyTokenService: deps.verifyTokenService,
      getAuthUserService: deps.getAuthUserService,
    });
    const canRead = requirePermission(permission("follow-up-visits", "read"));
    const canWrite = requirePermission(permission("follow-up-visits", "write"));

    app.get("/", { preHandler: [auth, canRead] }, async (req, reply) => {
      const raw = req.query as {
        limit?: string;
        offset?: string;
        patientId?: string;
        status?: string;
        date?: string;
      };
      const limit = Math.min(Math.max(Number(raw.limit) || 20, 1), 100);
      const offset = Math.max(Number(raw.offset) || 0, 0);

      const followUpVisits =
        await deps.listFollowUpVisitsService.listFollowUpVisits({
          limit,
          offset,
          patientId: raw.patientId,
          status: raw.status as FollowUpVisit["status"] | undefined,
          date: raw.date,
        });

      return reply.send(followUpVisits);
    });

    app.post(
      "/",
      { preHandler: [auth, canWrite], schema: { body: newFollowUpVisitSchema } },
      async (req, reply) => {
        const followUpVisit =
          await deps.createFollowUpVisitService.createFollowUpVisit(
            req.body as NewFollowUpVisit,
          );
        return reply.code(201).send(followUpVisit);
      },
    );

    app.get("/:followUpVisitId", { preHandler: [auth, canRead] }, async (req, reply) => {
      const { followUpVisitId } = req.params as { followUpVisitId: string };
      const followUpVisit = await deps.getFollowUpVisitService.getFollowUpVisit({
        id: followUpVisitId,
      });
      return reply.send(followUpVisit);
    });

    app.patch(
      "/:followUpVisitId",
      { preHandler: [auth, canWrite], schema: { body: updateFollowUpVisitSchema } },
      async (req, reply) => {
        const { followUpVisitId } = req.params as { followUpVisitId: string };
        const followUpVisit =
          await deps.updateFollowUpVisitService.updateFollowUpVisit({
            id: followUpVisitId,
            changes: req.body as UpdateFollowUpVisit,
          });
        return reply.send(followUpVisit);
      },
    );
  };
}
