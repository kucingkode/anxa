import { randomUUID } from "node:crypto";
import { desc, eq, ilike, or } from "drizzle-orm";
import type {
  ConditionReference,
  NewConditionReference,
  UpdateConditionReference,
} from "@simk/contracts";
import {
  CONDITION_REFERENCES_REPOSITORY_PORT,
  OUTBOUND_DIRECTION,
} from "../../../../../constants.js";
import { ConditionReferencesRepositoryError } from "../../../../../domain/errors/infrastructure-errors.js";
import type { ConditionReferencesRepository } from "../../../../../domain/ports/out/database/condition-references-repository.js";
import { BaseAdapter } from "../../../../../shared/classes/base-adapter.js";
import type { DrizzleTxContext } from "../database.js";
import { conditionReferences } from "../schema.js";

function toConditionReference(
  row: typeof conditionReferences.$inferSelect,
): ConditionReference {
  return {
    id: row.id,
    code: row.code,
    display: row.display,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export class DrizzleConditionReferencesRepository
  extends BaseAdapter
  implements ConditionReferencesRepository<DrizzleTxContext>
{
  constructor() {
    super(
      CONDITION_REFERENCES_REPOSITORY_PORT,
      OUTBOUND_DIRECTION,
      ConditionReferencesRepositoryError,
    );
  }

  async create(
    ctx: DrizzleTxContext,
    input: NewConditionReference,
  ): Promise<ConditionReference> {
    const now = new Date();

    const [row] = await ctx.tx
      .insert(conditionReferences)
      .values({
        id: randomUUID(),
        code: input.code,
        display: input.display,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return toConditionReference(row!);
  }

  async list(
    ctx: DrizzleTxContext,
    limit: number,
    query?: string,
    offset = 0,
  ): Promise<ConditionReference[]> {
    const rows = await ctx.tx.query.conditionReferences.findMany({
      ...(query
        ? {
            where: or(
              ilike(conditionReferences.code, `%${query}%`),
              ilike(conditionReferences.display, `%${query}%`),
            ),
          }
        : {}),
      orderBy: desc(conditionReferences.createdAt),
      limit,
      offset,
    });

    return rows.map(toConditionReference);
  }

  async getById(
    ctx: DrizzleTxContext,
    id: string,
  ): Promise<ConditionReference | undefined> {
    const row = await ctx.tx.query.conditionReferences.findFirst({
      where: eq(conditionReferences.id, id),
    });

    return row ? toConditionReference(row) : undefined;
  }

  async update(
    ctx: DrizzleTxContext,
    id: string,
    input: UpdateConditionReference,
  ): Promise<ConditionReference | undefined> {
    const existing = await ctx.tx.query.conditionReferences.findFirst({
      where: eq(conditionReferences.id, id),
    });

    if (!existing) {
      return undefined;
    }

    const [row] = await ctx.tx
      .update(conditionReferences)
      .set({
        code: input.code ?? existing.code,
        display: input.display ?? existing.display,
        updatedAt: new Date(),
      })
      .where(eq(conditionReferences.id, id))
      .returning();

    return toConditionReference(row!);
  }

  async remove(ctx: DrizzleTxContext, id: string): Promise<boolean> {
    const rows = await ctx.tx
      .delete(conditionReferences)
      .where(eq(conditionReferences.id, id))
      .returning({ id: conditionReferences.id });

    return rows.length > 0;
  }
}