import type { NewManufacturer, UpdateManufacturer } from "@simk/contracts";
import type { FastifyApp } from "../create-app.js";
import type { FastifyRestServerDeps } from "../deps.js";
import { permission } from "../../../../../domain/permissions.js";
import { createAuthMiddleware, requirePermission } from "../middleware/auth.js";

const newManufacturerSchema = {
  type: "object",
  required: ["name", "identifier"],
  additionalProperties: false,
  properties: {
    name: { type: "string" },
    identifier: { type: "string" },
    contact: { type: "string" },
  },
} as const;

const updateManufacturerSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    name: { type: "string" },
    identifier: { type: "string" },
    contact: { type: "string" },
  },
} as const;

export function manufacturersRoutes(deps: FastifyRestServerDeps) {
  return async (app: FastifyApp) => {
    const auth = createAuthMiddleware({
      verifyTokenService: deps.verifyTokenService,
      getAuthUserService: deps.getAuthUserService,
    });
    const canRead = requirePermission(permission("manufacturers", "read"));
    const canWrite = requirePermission(permission("manufacturers", "write"));
    const canDelete = requirePermission(permission("manufacturers", "delete"));

    app.get(
      "/",
      { preHandler: [auth, canRead] },
      async (req, reply) => {
        const raw = req.query as { limit?: string; offset?: string; query?: string };
        const limit = Math.min(Math.max(Number(raw.limit) || 20, 1), 100);
        const offset = Math.max(Number(raw.offset) || 0, 0);
        const manufacturers = await deps.listManufacturersService.listManufacturers({
          limit,
          offset,
          query: raw.query,
        });
        return reply.send(manufacturers);
      },
    );

    app.post(
      "/",
      { preHandler: [auth, canWrite], schema: { body: newManufacturerSchema } },
      async (req, reply) => {
        const manufacturer = await deps.createManufacturerService.createManufacturer(
          req.body as NewManufacturer,
        );
        return reply.code(201).send(manufacturer);
      },
    );

    app.get(
      "/:id",
      { preHandler: [auth, canRead] },
      async (req, reply) => {
        const { id } = req.params as { id: string };
        const manufacturer = await deps.getManufacturerService.getManufacturer({ id });
        return reply.send(manufacturer);
      },
    );

    app.patch(
      "/:id",
      { preHandler: [auth, canWrite], schema: { body: updateManufacturerSchema } },
      async (req, reply) => {
        const { id } = req.params as { id: string };
        const manufacturer = await deps.updateManufacturerService.updateManufacturer({
          id,
          changes: req.body as UpdateManufacturer,
        });
        return reply.send(manufacturer);
      },
    );

    app.delete(
      "/:id",
      { preHandler: [auth, canDelete] },
      async (req, reply) => {
        const { id } = req.params as { id: string };
        await deps.deleteManufacturerService.deleteManufacturer({ id });
        return reply.code(204).send();
      },
    );
  };
}