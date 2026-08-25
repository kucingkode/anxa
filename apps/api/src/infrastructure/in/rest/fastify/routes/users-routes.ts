import type { NewUser, UpdateUser } from "@simk/contracts";
import type { FastifyApp } from "../create-app.js";
import type { FastifyRestServerDeps } from "../deps.js";
import { permission } from "../../../../../domain/permissions.js";
import { createAuthMiddleware, requirePermission } from "../middleware/auth.js";

const newUserSchema = {
  type: "object",
  required: ["email", "password", "roleId"],
  additionalProperties: false,
  properties: {
    name: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 8 },
    roleId: { type: "string", format: "uuid" },
  },
} as const;

const updateUserSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    name: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 8 },
    roleId: { type: "string", format: "uuid" },
  },
} as const;

export function usersRoutes(deps: FastifyRestServerDeps) {
  return async (app: FastifyApp) => {
    const auth = createAuthMiddleware({
      verifyTokenService: deps.verifyTokenService,
      getAuthUserService: deps.getAuthUserService,
    });
    const canRead = requirePermission(permission("users", "read"));
    const canWrite = requirePermission(permission("users", "write"));
    const canDelete = requirePermission(permission("users", "delete"));

    app.get(
      "/",
      { preHandler: [auth, canRead] },
      async (req, reply) => {
        const raw = req.query as { limit?: string; offset?: string; query?: string; roleId?: string };
        const limit = Math.min(Math.max(Number(raw.limit) || 20, 1), 100);
        const offset = Math.max(Number(raw.offset) || 0, 0);
        const users = await deps.listUsersService.listUsers({ limit, offset, query: raw.query, roleId: raw.roleId });
        return reply.send(users);
      },
    );

    app.post(
      "/",
      { preHandler: [auth, canWrite], schema: { body: newUserSchema } },
      async (req, reply) => {
        const user = await deps.createUserService.createUser(req.body as NewUser);
        return reply.code(201).send(user);
      },
    );

    app.get(
      "/:id",
      { preHandler: [auth, canRead] },
      async (req, reply) => {
        const { id } = req.params as { id: string };
        const user = await deps.getUserService.getUser({ id });
        return reply.send(user);
      },
    );

    app.patch(
      "/:id",
      { preHandler: [auth, canWrite], schema: { body: updateUserSchema } },
      async (req, reply) => {
        const { id } = req.params as { id: string };
        const user = await deps.updateUserService.updateUser({ id, changes: req.body as UpdateUser });
        return reply.send(user);
      },
    );

    app.delete(
      "/:id",
      { preHandler: [auth, canDelete] },
      async (req, reply) => {
        const { id } = req.params as { id: string };
        const callerId = req.user!.id;
        await deps.deleteUserService.deleteUser({ id, callerId });
        return reply.code(204).send();
      },
    );
  };
}
