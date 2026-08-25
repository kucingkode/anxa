import { randomUUID } from "node:crypto";
import { and, desc, eq, ilike, isNull, or } from "drizzle-orm";
import type { NewProduct, Product, UpdateProduct } from "@simk/contracts";
import {
  OUTBOUND_DIRECTION,
  PRODUCTS_REPOSITORY_PORT,
} from "../../../../../constants.js";
import { ProductsRepositoryError } from "../../../../../domain/errors/infrastructure-errors.js";
import type { ProductsRepository } from "../../../../../domain/ports/out/database/products-repository.js";
import { BaseAdapter } from "../../../../../shared/classes/base-adapter.js";
import type { DrizzleTxContext } from "../database.js";
import { products } from "../schema.js";

function toProduct(row: typeof products.$inferSelect): Product {
  return {
    id: row.id,
    name: row.name,
    code: row.code,
    unit: row.unit,
    manufacturerId: row.manufacturerId,
    description: row.description ?? undefined,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export class DrizzleProductsRepository
  extends BaseAdapter
  implements ProductsRepository<DrizzleTxContext>
{
  constructor() {
    super(PRODUCTS_REPOSITORY_PORT, OUTBOUND_DIRECTION, ProductsRepositoryError);
  }

  async create(
    ctx: DrizzleTxContext,
    input: NewProduct,
  ): Promise<Product> {
    const now = new Date();

    const [row] = await ctx.tx
      .insert(products)
      .values({
        id: randomUUID(),
        name: input.name,
        code: input.code,
        unit: input.unit,
        manufacturerId: input.manufacturerId,
        description: input.description,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return toProduct(row!);
  }

  async list(
    ctx: DrizzleTxContext,
    limit: number,
    query?: string,
    manufacturerId?: string,
    offset = 0,
  ): Promise<Product[]> {
    const rows = await ctx.tx.query.products.findMany({
      where: and(
        isNull(products.deletedAt),
        ...(query
          ? [
              or(
                ilike(products.name, `%${query}%`),
                ilike(products.code, `%${query}%`),
              ),
            ]
          : []),
        ...(manufacturerId
          ? [eq(products.manufacturerId, manufacturerId)]
          : []),
      ),
      orderBy: desc(products.createdAt),
      limit,
      offset,
    });

    return rows.map(toProduct);
  }

  async getById(
    ctx: DrizzleTxContext,
    id: string,
  ): Promise<Product | undefined> {
    const row = await ctx.tx.query.products.findFirst({
      where: and(eq(products.id, id), isNull(products.deletedAt)),
    });

    return row ? toProduct(row) : undefined;
  }

  async update(
    ctx: DrizzleTxContext,
    id: string,
    input: UpdateProduct,
  ): Promise<Product | undefined> {
    const existing = await ctx.tx.query.products.findFirst({
      where: and(eq(products.id, id), isNull(products.deletedAt)),
    });

    if (!existing) {
      return undefined;
    }

    const [row] = await ctx.tx
      .update(products)
      .set({
        name: input.name ?? existing.name,
        code: input.code ?? existing.code,
        unit: input.unit ?? existing.unit,
        manufacturerId: input.manufacturerId ?? existing.manufacturerId,
        description: input.description ?? existing.description,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning();

    return toProduct(row!);
  }

  async remove(ctx: DrizzleTxContext, id: string): Promise<boolean> {
    const rows = await ctx.tx
      .update(products)
      .set({ deletedAt: new Date().toISOString() })
      .where(and(eq(products.id, id), isNull(products.deletedAt)))
      .returning({ id: products.id });

    return rows.length > 0;
  }
}