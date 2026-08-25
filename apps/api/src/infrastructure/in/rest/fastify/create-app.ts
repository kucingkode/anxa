import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { openapiSpec } from "@simk/contracts";
import Fastify from "fastify";
import type { Logger } from "../../../../observability/logging.js";

export function createApp(log: Logger) {
  const app = Fastify({ loggerInstance: log });

  app.register(cors, { origin: true, credentials: true });
  app.register(cookie);

  // Contract-first: serve the canonical OpenAPI spec (from @simk/contracts).
  app.register(swagger, { openapi: openapiSpec as Record<string, unknown> });
  app.register(swaggerUi, { routePrefix: "/docs" });

  return app;
}

export type FastifyApp = ReturnType<typeof createApp>;
