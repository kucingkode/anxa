import type { NewProduct, UpdateProduct } from "@simk/contracts";
import type { FastifyApp } from "../create-app.js";
import type { FastifyRestServerDeps } from "../deps.js";
import { permission } from "../../../../../domain/permissions.js";
import { createAuthMiddleware, requirePermission } from "../middleware/auth.js";

const newProductSchema = {
  type: "object",
  required: ["name", "code", "unit", "manufacturerId"],
  additionalProperties: false,
  properties: {
    name: { type: "string" },
    code: { type: "string" },
    unit: { type: "string" },
    manufacturerId: { type: "string" },
    description: { type: "string" },
  },
} as const;

const updateProductSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    name: { type: "string" },
    code: { type: "string" },
    unit: { type: "string" },
    manufacturerId: { type: "string" },
    description: { type: "string" },
  },
} as const;

export function productsRoutes(deps: FastifyRestServerDeps) {
  return async (app: FastifyApp) => {
    const auth = createAuthMiddleware({
      verifyTokenService: deps.verifyTokenService,
      getAuthUserService: deps.getAuthUserService,
    });
    const canRead = requirePermission(permission("products", "read"));
    const canWrite = requirePermission(permission("products", "write"));
    const canDelete = requirePermission(permission("products", "delete"));

    app.get(
      "/",
      { preHandler: [auth, canRead] },
      async (req, reply) => {
        const raw = req.query as { limit?: string; offset?: string; query?: string; manufacturerId?: string };
        const limit = Math.min(Math.max(Number(raw.limit) || 20, 1), 100);
        const offset = Math.max(Number(raw.offset) || 0, 0);
        const products = await deps.listProductsService.listProducts({
          limit,
          offset,
          query: raw.query,
          manufacturerId: raw.manufacturerId,
        });
        return reply.send(products);
      },
    );

    app.post(
      "/",
      { preHandler: [auth, canWrite], schema: { body: newProductSchema } },
      async (req, reply) => {
        const product = await deps.createProductService.createProduct(req.body as NewProduct);
        return reply.code(201).send(product);
      },
    );

    app.get(
      "/:id",
      { preHandler: [auth, canRead] },
      async (req, reply) => {
        const { id } = req.params as { id: string };
        const product = await deps.getProductService.getProduct({ id });
        return reply.send(product);
      },
    );

    app.patch(
      "/:id",
      { preHandler: [auth, canWrite], schema: { body: updateProductSchema } },
      async (req, reply) => {
        const { id } = req.params as { id: string };
        const product = await deps.updateProductService.updateProduct({ id, changes: req.body as UpdateProduct });
        return reply.send(product);
      },
    );

    app.delete(
      "/:id",
      { preHandler: [auth, canDelete] },
      async (req, reply) => {
        const { id } = req.params as { id: string };
        await deps.deleteProductService.deleteProduct({ id });
        return reply.code(204).send();
      },
    );
  };
}