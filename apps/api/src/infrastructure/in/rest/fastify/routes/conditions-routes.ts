import type { NewCondition, UpdateCondition } from "@simk/contracts";
import type { FastifyApp } from "../create-app.js";
import type { FastifyRestServerDeps } from "../deps.js";
import { permission } from "../../../../../domain/permissions.js";
import { createAuthMiddleware, requirePermission } from "../middleware/auth.js";

const newConditionSchema = {
  type: "object",
  required: ["patientId", "visitId", "code"],
  additionalProperties: false,
  properties: {
    patientId: { type: "string", format: "uuid" },
    visitId: { type: "string", format: "uuid" },
    code: { type: "string", minLength: 1 },
    codeDisplay: { type: "string" },
    clinicalStatus: { type: "string" },
    notes: { type: "string" },
  },
} as const;

const updateConditionSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    codeDisplay: { type: "string" },
    clinicalStatus: { type: "string" },
    notes: { type: "string" },
  },
} as const;

export function conditionsRoutes(deps: FastifyRestServerDeps) {
  return async (app: FastifyApp) => {
    const auth = createAuthMiddleware({
      verifyTokenService: deps.verifyTokenService,
      getAuthUserService: deps.getAuthUserService,
    });
    const canRead = requirePermission(permission("conditions", "read"));
    const canWrite = requirePermission(permission("conditions", "write"));
    const canDelete = requirePermission(permission("conditions", "delete"));

    app.get("/", { preHandler: [auth, canRead] }, async (req, reply) => {
      const raw = req.query as {
        limit?: string;
        offset?: string;
        patientId?: string;
        visitId?: string;
      };
      const limit = Math.min(Math.max(Number(raw.limit) || 20, 1), 100);
      const offset = Math.max(Number(raw.offset) || 0, 0);

      const conditions = await deps.listConditionsService.listConditions({
        limit,
        offset,
        patientId: raw.patientId,
        visitId: raw.visitId,
      });

      return reply.send(conditions);
    });

    app.post(
      "/",
      { preHandler: [auth, canWrite], schema: { body: newConditionSchema } },
      async (req, reply) => {
        const condition = await deps.createConditionService.createCondition(
          req.body as NewCondition,
        );
        return reply.code(201).send(condition);
      },
    );

    app.get("/:conditionId", { preHandler: [auth, canRead] }, async (req, reply) => {
      const { conditionId } = req.params as { conditionId: string };
      const condition = await deps.getConditionService.getCondition({
        id: conditionId,
      });
      return reply.send(condition);
    });

    app.patch(
      "/:conditionId",
      { preHandler: [auth, canWrite], schema: { body: updateConditionSchema } },
      async (req, reply) => {
        const { conditionId } = req.params as { conditionId: string };
        const condition = await deps.updateConditionService.updateCondition({
          id: conditionId,
          changes: req.body as UpdateCondition,
        });
        return reply.send(condition);
      },
    );

    app.delete("/:conditionId", { preHandler: [auth, canDelete] }, async (req, reply) => {
      const { conditionId } = req.params as { conditionId: string };
      await deps.deleteConditionService.deleteCondition({ id: conditionId });
      return reply.code(204).send();
    });
  };
}
