import type { NewRole, UpdateRole } from "@simk/contracts";
import type { FastifyApp } from "../create-app.js";
import type { FastifyRestServerDeps } from "../deps.js";
import { permission } from "../../../../../domain/permissions.js";
import { createAuthMiddleware, requirePermission } from "../middleware/auth.js";

const newRoleSchema = {
  type: "object",
  required: ["name", "permissions"],
  additionalProperties: false,
  properties: {
    name: { type: "string", minLength: 1 },
    description: { type: "string" },
    permissions: { type: "array", items: { type: "string" } },
  },
} as const;

const updateRoleSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    name: { type: "string", minLength: 1 },
    description: { type: "string" },
    permissions: { type: "array", items: { type: "string" } },
  },
} as const;

export function rolesRoutes(deps: FastifyRestServerDeps) {
  return async (app: FastifyApp) => {
    const auth = createAuthMiddleware({
      verifyTokenService: deps.verifyTokenService,
      getAuthUserService: deps.getAuthUserService,
    });
    const canRead = requirePermission(permission("roles", "read"));
    const canWrite = requirePermission(permission("roles", "write"));
    const canDelete = requirePermission(permission("roles", "delete"));

    app.get("/", { preHandler: [auth, canRead] }, async (req, reply) => {
      const raw = req.query as { limit?: string; offset?: string; query?: string };
      const limit = Math.min(Math.max(Number(raw.limit) || 20, 1), 100);
      const offset = Math.max(Number(raw.offset) || 0, 0);
      const roles = await deps.listRolesService.listRoles({ limit, offset, query: raw.query });
      return reply.send(roles);
    });

    app.post("/", { preHandler: [auth, canWrite], schema: { body: newRoleSchema } }, async (req, reply) => {
      const role = await deps.createRoleService.createRole(req.body as NewRole);
      return reply.code(201).send(role);
    });

    app.get("/:id", { preHandler: [auth, canRead] }, async (req, reply) => {
      const { id } = req.params as { id: string };
      const role = await deps.getRoleService.getRole({ id });
      return reply.send(role);
    });

    app.patch("/:id", { preHandler: [auth, canWrite], schema: { body: updateRoleSchema } }, async (req, reply) => {
      const { id } = req.params as { id: string };
      const role = await deps.updateRoleService.updateRole({ id, changes: req.body as UpdateRole });
      return reply.send(role);
    });

    app.delete("/:id", { preHandler: [auth, canDelete] }, async (req, reply) => {
      const { id } = req.params as { id: string };
      await deps.deleteRoleService.deleteRole({ id });
      return reply.code(204).send();
    });
  };
}
