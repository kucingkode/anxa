import type { NewPatient, UpdatePatient } from "@simk/contracts";
import type { FastifyApp } from "../create-app.js";
import type { FastifyRestServerDeps } from "../deps.js";
import { permission } from "../../../../../domain/permissions.js";
import { createAuthMiddleware, requirePermission } from "../middleware/auth.js";

const newPatientSchema = {
  type: "object",
  required: ["name", "identifier", "gender"],
  additionalProperties: false,
  properties: {
    name: { type: "string", minLength: 1 },
    identifier: { type: "string", minLength: 1 },
    gender: { type: "string", enum: ["male", "female", "other", "unknown"] },
    birthDate: { type: "string" },
    phone: { type: "string" },
  },
} as const;

const updatePatientSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    name: { type: "string", minLength: 1 },
    gender: { type: "string", enum: ["male", "female", "other", "unknown"] },
    birthDate: { type: "string" },
    phone: { type: "string" },
  },
} as const;

export function patientsRoutes(deps: FastifyRestServerDeps) {
  return async (app: FastifyApp) => {
    const auth = createAuthMiddleware({
      verifyTokenService: deps.verifyTokenService,
      getAuthUserService: deps.getAuthUserService,
    });
    const canReadPatients = requirePermission(permission("patients", "read"));
    const canWritePatients = requirePermission(permission("patients", "write"));
    const canDeletePatients = requirePermission(permission("patients", "delete"));
    const canReadVisits = requirePermission(permission("visits", "read"));

    app.get("/", { preHandler: [auth, canReadPatients] }, async (req, reply) => {
      const raw = req.query as { limit?: string; offset?: string; query?: string };
      const limit = Math.min(Math.max(Number(raw.limit) || 20, 1), 100);
      const offset = Math.max(Number(raw.offset) || 0, 0);

      const patients = await deps.listPatientsService.listPatients({
        limit,
        offset,
        query: raw.query,
      });

      return reply.send(patients);
    });

    app.post(
      "/",
      { preHandler: [auth, canWritePatients], schema: { body: newPatientSchema } },
      async (req, reply) => {
        const patient = await deps.createPatientService.createPatient(
          req.body as NewPatient,
        );
        return reply.code(201).send(patient);
      },
    );

    app.get("/:id", { preHandler: [auth, canReadPatients] }, async (req, reply) => {
      const { id } = req.params as { id: string };
      const patient = await deps.getPatientService.getPatient({ id });
      return reply.send(patient);
    });

    app.get("/:patientId/visits", { preHandler: [auth, canReadVisits] }, async (req, reply) => {
      const { patientId } = req.params as { patientId: string };
      const raw = req.query as { limit?: string; offset?: string };
      const limit = Math.min(Math.max(Number(raw.limit) || 20, 1), 100);
      const offset = Math.max(Number(raw.offset) || 0, 0);

      const visits = await deps.listVisitsService.listVisits({
        limit,
        offset,
        patientId,
      });

      return reply.send(visits);
    });

    app.patch(
      "/:id",
      { preHandler: [auth, canWritePatients], schema: { body: updatePatientSchema } },
      async (req, reply) => {
        const { id } = req.params as { id: string };
        const patient = await deps.updatePatientService.updatePatient({
          id,
          changes: req.body as UpdatePatient,
        });
        return reply.send(patient);
      },
    );

    app.delete("/:id", { preHandler: [auth, canDeletePatients] }, async (req, reply) => {
      const { id } = req.params as { id: string };
      await deps.deletePatientService.deletePatient({ id });
      return reply.code(204).send();
    });
  };
}
