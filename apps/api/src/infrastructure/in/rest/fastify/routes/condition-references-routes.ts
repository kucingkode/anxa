import type { NewConditionReference, UpdateConditionReference } from "@simk/contracts";
import type { FastifyApp } from "../create-app.js";
import type { FastifyRestServerDeps } from "../deps.js";
import { permission } from "../../../../../domain/permissions.js";
import { createAuthMiddleware, requirePermission } from "../middleware/auth.js";

const newConditionReferenceSchema = {
  type: "object",
  required: ["code", "display"],
  additionalProperties: false,
  properties: {
    code: { type: "string" },
    display: { type: "string" },
  },
} as const;

const updateConditionReferenceSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    code: { type: "string" },
    display: { type: "string" },
  },
} as const;

export function conditionReferencesRoutes(deps: FastifyRestServerDeps) {
  return async (app: FastifyApp) => {
    const auth = createAuthMiddleware({
      verifyTokenService: deps.verifyTokenService,
      getAuthUserService: deps.getAuthUserService,
    });
    const canRead = requirePermission(permission("condition-references", "read"));
    const canWrite = requirePermission(permission("condition-references", "write"));
    const canDelete = requirePermission(permission("condition-references", "delete"));

    app.get(
      "/",
      { preHandler: [auth, canRead] },
      async (req, reply) => {
        const raw = req.query as { limit?: string; offset?: string; query?: string };
        const limit = Math.min(Math.max(Number(raw.limit) || 20, 1), 100);
        const offset = Math.max(Number(raw.offset) || 0, 0);
        const references = await deps.listConditionReferencesService.listConditionReferences({
          limit,
          offset,
          query: raw.query,
        });
        return reply.send(references);
      },
    );

    app.post(
      "/",
      { preHandler: [auth, canWrite], schema: { body: newConditionReferenceSchema } },
      async (req, reply) => {
        const reference = await deps.createConditionReferenceService.createConditionReference(
          req.body as NewConditionReference,
        );
        return reply.code(201).send(reference);
      },
    );

    app.get(
      "/:id",
      { preHandler: [auth, canRead] },
      async (req, reply) => {
        const { id } = req.params as { id: string };
        const reference = await deps.getConditionReferenceService.getConditionReference({ id });
        return reply.send(reference);
      },
    );

    app.patch(
      "/:id",
      { preHandler: [auth, canWrite], schema: { body: updateConditionReferenceSchema } },
      async (req, reply) => {
        const { id } = req.params as { id: string };
        const reference = await deps.updateConditionReferenceService.updateConditionReference({
          id,
          changes: req.body as UpdateConditionReference,
        });
        return reply.send(reference);
      },
    );

    app.delete(
      "/:id",
      { preHandler: [auth, canDelete] },
      async (req, reply) => {
        const { id } = req.params as { id: string };
        await deps.deleteConditionReferenceService.deleteConditionReference({ id });
        return reply.code(204).send();
      },
    );
  };
}