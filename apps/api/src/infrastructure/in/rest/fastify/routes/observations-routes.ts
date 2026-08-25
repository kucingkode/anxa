import type {
  NewObservation,
  Observation,
  UpdateObservation,
} from "@simk/contracts";
import { PreconditionFailedError } from "../../../../../domain/errors/domain/precondition-failed-error.js";
import type { FastifyApp } from "../create-app.js";
import type { FastifyRestServerDeps } from "../deps.js";
import { permission } from "../../../../../domain/permissions.js";
import { createAuthMiddleware, requirePermission } from "../middleware/auth.js";

const newObservationSchema = {
  type: "object",
  required: ["patientId", "visitId", "code", "value"],
  additionalProperties: false,
  properties: {
    patientId: { type: "string", format: "uuid" },
    visitId: { type: "string", format: "uuid" },
    code: { type: "string", minLength: 1 },
    codeDisplay: { type: "string" },
    value: { type: "number" },
    unit: { type: "string" },
    status: {
      type: "string",
      enum: ["preliminary", "final", "amended", "cancelled", "entered-in-error"],
    },
    interpretation: { type: "string" },
  },
} as const;

const updateObservationSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    value: { type: "number" },
    unit: { type: "string" },
    codeDisplay: { type: "string" },
    interpretation: { type: "string" },
  },
} as const;

const observationStatusUpdateSchema = {
  type: "object",
  required: ["status"],
  additionalProperties: false,
  properties: {
    status: {
      type: "string",
      enum: ["preliminary", "final", "amended", "cancelled", "entered-in-error"],
    },
  },
} as const;

function parseIfMatch(ifMatch: string | undefined): number {
  const expectedVersion = Number(ifMatch);
  if (!ifMatch || Number.isNaN(expectedVersion)) {
    throw new PreconditionFailedError();
  }
  return expectedVersion;
}

export function observationsRoutes(deps: FastifyRestServerDeps) {
  return async (app: FastifyApp) => {
    const auth = createAuthMiddleware({
      verifyTokenService: deps.verifyTokenService,
      getAuthUserService: deps.getAuthUserService,
    });
    const canRead = requirePermission(permission("observations", "read"));
    const canWrite = requirePermission(permission("observations", "write"));
    const canDelete = requirePermission(permission("observations", "delete"));

    app.get("/", { preHandler: [auth, canRead] }, async (req, reply) => {
      const raw = req.query as {
        limit?: string;
        offset?: string;
        patientId?: string;
        visitId?: string;
        status?: string;
      };
      const limit = Math.min(Math.max(Number(raw.limit) || 20, 1), 100);
      const offset = Math.max(Number(raw.offset) || 0, 0);

      const observations = await deps.listObservationsService.listObservations({
        limit,
        offset,
        patientId: raw.patientId,
        visitId: raw.visitId,
        status: raw.status as Observation["status"] | undefined,
      });

      return reply.send(observations);
    });

    app.post(
      "/",
      { preHandler: [auth, canWrite], schema: { body: newObservationSchema } },
      async (req, reply) => {
        const observation = await deps.createObservationService.createObservation(
          req.body as NewObservation,
        );
        return reply.code(201).send(observation);
      },
    );

    app.get("/:observationId", { preHandler: [auth, canRead] }, async (req, reply) => {
      const { observationId } = req.params as { observationId: string };
      const observation = await deps.getObservationService.getObservation({
        id: observationId,
      });
      return reply.send(observation);
    });

    app.patch(
      "/:observationId",
      { preHandler: [auth, canWrite], schema: { body: updateObservationSchema } },
      async (req, reply) => {
        const { observationId } = req.params as { observationId: string };
        const expectedVersion = parseIfMatch(
          req.headers["if-match"] as string | undefined,
        );

        const observation = await deps.updateObservationService.updateObservation(
          {
            id: observationId,
            changes: req.body as UpdateObservation,
            expectedVersion,
          },
        );
        return reply.send(observation);
      },
    );

    app.patch(
      "/:observationId/status",
      { preHandler: [auth, canWrite], schema: { body: observationStatusUpdateSchema } },
      async (req, reply) => {
        const { observationId } = req.params as { observationId: string };
        const expectedVersion = parseIfMatch(
          req.headers["if-match"] as string | undefined,
        );
        const body = req.body as { status: Observation["status"] };

        const observation =
          await deps.updateObservationStatusService.updateObservationStatus({
            id: observationId,
            status: body.status,
            expectedVersion,
          });
        return reply.send(observation);
      },
    );

    app.delete("/:observationId", { preHandler: [auth, canDelete] }, async (req, reply) => {
      const { observationId } = req.params as { observationId: string };
      await deps.deleteObservationService.deleteObservation({ id: observationId });
      return reply.code(204).send();
    });
  };
}
