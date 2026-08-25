import type { NewProcedure, UpdateProcedure } from "@simk/contracts";
import type { FastifyApp } from "../create-app.js";
import type { FastifyRestServerDeps } from "../deps.js";
import { permission } from "../../../../../domain/permissions.js";
import { createAuthMiddleware, requirePermission } from "../middleware/auth.js";

const newProcedureSchema = {
  type: "object",
  required: ["patientId", "visitId", "code"],
  additionalProperties: false,
  properties: {
    patientId: { type: "string", format: "uuid" },
    visitId: { type: "string", format: "uuid" },
    code: { type: "string", minLength: 1 },
    codeDisplay: { type: "string" },
    status: { type: "string" },
    performedAt: { type: "string", format: "date-time" },
    notes: { type: "string" },
  },
} as const;

const updateProcedureSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    codeDisplay: { type: "string" },
    status: { type: "string" },
    performedAt: { type: "string", format: "date-time" },
    notes: { type: "string" },
  },
} as const;

export function proceduresRoutes(deps: FastifyRestServerDeps) {
  return async (app: FastifyApp) => {
    const auth = createAuthMiddleware({
      verifyTokenService: deps.verifyTokenService,
      getAuthUserService: deps.getAuthUserService,
    });
    const canRead = requirePermission(permission("procedures", "read"));
    const canWrite = requirePermission(permission("procedures", "write"));
    const canDelete = requirePermission(permission("procedures", "delete"));

    app.get("/", { preHandler: [auth, canRead] }, async (req, reply) => {
      const raw = req.query as {
        limit?: string;
        offset?: string;
        patientId?: string;
        visitId?: string;
      };
      const limit = Math.min(Math.max(Number(raw.limit) || 20, 1), 100);
      const offset = Math.max(Number(raw.offset) || 0, 0);

      const procedures = await deps.listProceduresService.listProcedures({
        limit,
        offset,
        patientId: raw.patientId,
        visitId: raw.visitId,
      });

      return reply.send(procedures);
    });

    app.post(
      "/",
      { preHandler: [auth, canWrite], schema: { body: newProcedureSchema } },
      async (req, reply) => {
        const procedure = await deps.createProcedureService.createProcedure(
          req.body as NewProcedure,
        );
        return reply.code(201).send(procedure);
      },
    );

    app.get("/:procedureId", { preHandler: [auth, canRead] }, async (req, reply) => {
      const { procedureId } = req.params as { procedureId: string };
      const procedure = await deps.getProcedureService.getProcedure({
        id: procedureId,
      });
      return reply.send(procedure);
    });

    app.patch(
      "/:procedureId",
      { preHandler: [auth, canWrite], schema: { body: updateProcedureSchema } },
      async (req, reply) => {
        const { procedureId } = req.params as { procedureId: string };
        const procedure = await deps.updateProcedureService.updateProcedure({
          id: procedureId,
          changes: req.body as UpdateProcedure,
        });
        return reply.send(procedure);
      },
    );

    app.delete("/:procedureId", { preHandler: [auth, canDelete] }, async (req, reply) => {
      const { procedureId } = req.params as { procedureId: string };
      await deps.deleteProcedureService.deleteProcedure({ id: procedureId });
      return reply.code(204).send();
    });
  };
}
