import { STATUS_CODES } from "node:http";
import type { FastifyError } from "fastify";
import { INBOUND_DIRECTION, REST_SERVER_PORT } from "../../../../constants.js";
import { DomainError } from "../../../../domain/errors/domain/domain-error.js";
import { createAdapterLogger } from "../../../../shared/utils/create-adapter-logger.js";
import { createApp } from "./create-app.js";
import type { FastifyRestServerDeps } from "./deps.js";
import { ERROR_HTTP_STATUS_CODES } from "./error-http-status-codes.js";
import { conditionsRoutes } from "./routes/conditions-routes.js";
import { followUpVisitsRoutes } from "./routes/follow-up-visits-routes.js";
import { healthRoutes } from "./routes/health-routes.js";
import { authRoutes } from "./routes/auth-routes.js";
import { usersRoutes } from "./routes/users-routes.js";
import { rolesRoutes } from "./routes/roles-routes.js";
import { productsRoutes } from "./routes/products-routes.js";
import { manufacturersRoutes } from "./routes/manufacturers-routes.js";
import { conditionReferencesRoutes } from "./routes/condition-references-routes.js";
import { procedureReferencesRoutes } from "./routes/procedure-references-routes.js";
import { observationsRoutes } from "./routes/observations-routes.js";
import { patientsRoutes } from "./routes/patients-routes.js";
import { proceduresRoutes } from "./routes/procedures-routes.js";
import { queuesRoutes } from "./routes/queues-routes.js";
import { visitsRoutes } from "./routes/visits-routes.js";

export function createFastifyRestServer(deps: FastifyRestServerDeps) {
  const log = createAdapterLogger(
    "Fastify",
    REST_SERVER_PORT,
    INBOUND_DIRECTION,
  );

  const app = createApp(log);

  app.addHook("onSend", async (req, reply) => {
    reply.header("x-request-id", req.id);
  });

  app.register(healthRoutes(deps) as any);
  app.register(authRoutes(deps) as any);
  app.register(usersRoutes(deps) as any, { prefix: "/v1/users" });
  app.register(rolesRoutes(deps) as any, { prefix: "/v1/roles" });
  app.register(productsRoutes(deps) as any, { prefix: "/v1/products" });
  app.register(manufacturersRoutes(deps) as any, { prefix: "/v1/manufacturers" });
  app.register(conditionReferencesRoutes(deps) as any, { prefix: "/v1/condition-references" });
  app.register(procedureReferencesRoutes(deps) as any, { prefix: "/v1/procedure-references" });
  app.register(patientsRoutes(deps) as any, { prefix: "/v1/patients" });
  app.register(queuesRoutes(deps) as any, { prefix: "/v1/queues" });
  app.register(visitsRoutes(deps) as any, { prefix: "/v1/visits" });
  app.register(observationsRoutes(deps) as any, { prefix: "/v1/observations" });
  app.register(conditionsRoutes(deps) as any, { prefix: "/v1/conditions" });
  app.register(proceduresRoutes(deps) as any, { prefix: "/v1/procedures" });
  app.register(followUpVisitsRoutes(deps) as any, { prefix: "/v1/follow-up-visits" });

  app.setErrorHandler((err, _req, reply) => {
    if ((err as FastifyError).statusCode) {
      const { statusCode, code, message } = err as FastifyError;
      return reply.status(statusCode ?? 500).send({
        statusCode,
        error: STATUS_CODES[statusCode ?? 500] ?? code ?? "Error",
        message,
      });
    }

    if (err instanceof DomainError && err.code) {
      const statusCode = ERROR_HTTP_STATUS_CODES[err.code] ?? 500;
      return reply.status(statusCode).send({
        statusCode,
        error: err.code,
        message: err.message,
      });
    }

    log.error({ err });

    return reply.status(500).send({
      statusCode: 500,
      error: "INTERNAL_ERROR",
      message: "An unexpected error occurred",
    });
  });

  return app;
}
