import { randomUUID } from "node:crypto";
import { and, desc, eq, ilike, isNull, or } from "drizzle-orm";
import type { NewManufacturer, Manufacturer, UpdateManufacturer } from "@simk/contracts";
import {
  MANUFACTURERS_REPOSITORY_PORT,
  OUTBOUND_DIRECTION,
} from "../../../../../constants.js";
import { ManufacturersRepositoryError } from "../../../../../domain/errors/infrastructure-errors.js";
import type { ManufacturersRepository } from "../../../../../domain/ports/out/database/manufacturers-repository.js";
import { BaseAdapter } from "../../../../../shared/classes/base-adapter.js";
import type { DrizzleTxContext } from "../database.js";
import { manufacturers } from "../schema.js";

function toManufacturer(row: typeof manufacturers.$inferSelect): Manufacturer {
  return {
    id: row.id,
    name: row.name,
    identifier: row.identifier,
    contact: row.contact ?? undefined,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export class DrizzleManufacturersRepository
  extends BaseAdapter
  implements ManufacturersRepository<DrizzleTxContext>
{
  constructor() {
    super(
      MANUFACTURERS_REPOSITORY_PORT,
      OUTBOUND_DIRECTION,
      ManufacturersRepositoryError,
    );
  }

  async create(
    ctx: DrizzleTxContext,
    input: NewManufacturer,
  ): Promise<Manufacturer> {
    const now = new Date();

    const [row] = await ctx.tx
      .insert(manufacturers)
      .values({
        id: randomUUID(),
        name: input.name,
        identifier: input.identifier,
        contact: input.contact,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return toManufacturer(row!);
  }

  async list(
    ctx: DrizzleTxContext,
    limit: number,
    query?: string,
    offset = 0,
  ): Promise<Manufacturer[]> {
    const rows = await ctx.tx.query.manufacturers.findMany({
      where: and(
        isNull(manufacturers.deletedAt),
        ...(query
          ? [
              or(
                ilike(manufacturers.name, `%${query}%`),
                ilike(manufacturers.identifier, `%${query}%`),
              ),
            ]
          : []),
      ),
      orderBy: desc(manufacturers.createdAt),
      limit,
      offset,
    });

    return rows.map(toManufacturer);
  }

  async getById(
    ctx: DrizzleTxContext,
    id: string,
  ): Promise<Manufacturer | undefined> {
    const row = await ctx.tx.query.manufacturers.findFirst({
      where: and(eq(manufacturers.id, id), isNull(manufacturers.deletedAt)),
    });

    return row ? toManufacturer(row) : undefined;
  }

  async update(
    ctx: DrizzleTxContext,
    id: string,
    input: UpdateManufacturer,
  ): Promise<Manufacturer | undefined> {
    const existing = await ctx.tx.query.manufacturers.findFirst({
      where: and(eq(manufacturers.id, id), isNull(manufacturers.deletedAt)),
    });

    if (!existing) {
      return undefined;
    }

    const [row] = await ctx.tx
      .update(manufacturers)
      .set({
        name: input.name ?? existing.name,
        identifier: input.identifier ?? existing.identifier,
        contact: input.contact ?? existing.contact,
        updatedAt: new Date(),
      })
      .where(eq(manufacturers.id, id))
      .returning();

    return toManufacturer(row!);
  }

  async remove(ctx: DrizzleTxContext, id: string): Promise<boolean> {
    const rows = await ctx.tx
      .update(manufacturers)
      .set({ deletedAt: new Date().toISOString() })
      .where(and(eq(manufacturers.id, id), isNull(manufacturers.deletedAt)))
      .returning({ id: manufacturers.id });

    return rows.length > 0;
  }
}