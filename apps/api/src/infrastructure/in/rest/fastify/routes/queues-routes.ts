import type { NewQueue, Queue } from "@simk/contracts";
import { PreconditionFailedError } from "../../../../../domain/errors/domain/precondition-failed-error.js";
import type { FastifyApp } from "../create-app.js";
import type { FastifyRestServerDeps } from "../deps.js";
import { permission } from "../../../../../domain/permissions.js";
import { createAuthMiddleware, requirePermission } from "../middleware/auth.js";

const newQueueSchema = {
  type: "object",
  required: ["patientId"],
  additionalProperties: false,
  properties: {
    patientId: { type: "string", format: "uuid" },
  },
} as const;

const updateQueueSchema = {
  type: "object",
  required: ["status"],
  additionalProperties: false,
  properties: {
    status: {
      type: "string",
      enum: ["waiting", "in-service", "done", "cancelled"],
    },
  },
} as const;

export function queuesRoutes(deps: FastifyRestServerDeps) {
  return async (app: FastifyApp) => {
    const auth = createAuthMiddleware({
      verifyTokenService: deps.verifyTokenService,
      getAuthUserService: deps.getAuthUserService,
    });
    const canRead = requirePermission(permission("queues", "read"));
    const canWrite = requirePermission(permission("queues", "write"));
    const canDelete = requirePermission(permission("queues", "delete"));

    app.get("/", { preHandler: [auth, canRead] }, async (req, reply) => {
      const raw = req.query as {
        limit?: string;
        offset?: string;
        patientId?: string;
        status?: string;
      };
      const limit = Math.min(Math.max(Number(raw.limit) || 20, 1), 100);
      const offset = Math.max(Number(raw.offset) || 0, 0);

      const queues = await deps.listQueuesService.listQueues({
        limit,
        offset,
        patientId: raw.patientId,
        status: raw.status as Queue["status"] | undefined,
      });

      return reply.send(queues);
    });

    app.post(
      "/",
      { preHandler: [auth, canWrite], schema: { body: newQueueSchema } },
      async (req, reply) => {
        const queue = await deps.createQueueService.createQueue(
          req.body as NewQueue,
        );
        return reply.code(201).send(queue);
      },
    );

    app.get("/:queueId", { preHandler: [auth, canRead] }, async (req, reply) => {
      const { queueId } = req.params as { queueId: string };
      const queue = await deps.getQueueService.getQueue({ id: queueId });
      return reply.send(queue);
    });

    app.patch(
      "/:queueId",
      { preHandler: [auth, canWrite], schema: { body: updateQueueSchema } },
      async (req, reply) => {
        const { queueId } = req.params as { queueId: string };
        const ifMatch = req.headers["if-match"] as string | undefined;
        const expectedVersion = Number(ifMatch);

        if (!ifMatch || Number.isNaN(expectedVersion)) {
          throw new PreconditionFailedError();
        }

        const body = req.body as { status: Queue["status"] };
        const queue = await deps.updateQueueService.updateQueue({
          id: queueId,
          status: body.status,
          expectedVersion,
        });
        return reply.send(queue);
      },
    );

    app.delete("/:queueId", { preHandler: [auth, canDelete] }, async (req, reply) => {
      const { queueId } = req.params as { queueId: string };
      await deps.deleteQueueService.deleteQueue({ id: queueId });
      return reply.code(204).send();
    });
  };
}
