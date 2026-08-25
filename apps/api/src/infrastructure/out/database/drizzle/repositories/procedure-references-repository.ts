import { randomUUID } from "node:crypto";
import { desc, eq, ilike, or } from "drizzle-orm";
import type {
  NewProcedureReference,
  ProcedureReference,
  UpdateProcedureReference,
} from "@simk/contracts";
import {
  OUTBOUND_DIRECTION,
  PROCEDURE_REFERENCES_REPOSITORY_PORT,
} from "../../../../../constants.js";
import { ProcedureReferencesRepositoryError } from "../../../../../domain/errors/infrastructure-errors.js";
import type { ProcedureReferencesRepository } from "../../../../../domain/ports/out/database/procedure-references-repository.js";
import { BaseAdapter } from "../../../../../shared/classes/base-adapter.js";
import type { DrizzleTxContext } from "../database.js";
import { procedureReferences } from "../schema.js";

function toProcedureReference(
  row: typeof procedureReferences.$inferSelect,
): ProcedureReference {
  return {
    id: row.id,
    code: row.code,
    display: row.display,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export class DrizzleProcedureReferencesRepository
  extends BaseAdapter
  implements ProcedureReferencesRepository<DrizzleTxContext>
{
  constructor() {
    super(
      PROCEDURE_REFERENCES_REPOSITORY_PORT,
      OUTBOUND_DIRECTION,
      ProcedureReferencesRepositoryError,
    );
  }

  async create(
    ctx: DrizzleTxContext,
    input: NewProcedureReference,
  ): Promise<ProcedureReference> {
    const now = new Date();

    const [row] = await ctx.tx
      .insert(procedureReferences)
      .values({
        id: randomUUID(),
        code: input.code,
        display: input.display,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return toProcedureReference(row!);
  }

  async list(
    ctx: DrizzleTxContext,
    limit: number,
    query?: string,
    offset = 0,
  ): Promise<ProcedureReference[]> {
    const rows = await ctx.tx.query.procedureReferences.findMany({
      ...(query
        ? {
            where: or(
              ilike(procedureReferences.code, `%${query}%`),
              ilike(procedureReferences.display, `%${query}%`),
            ),
          }
        : {}),
      orderBy: desc(procedureReferences.createdAt),
      limit,
      offset,
    });

    return rows.map(toProcedureReference);
  }

  async getById(
    ctx: DrizzleTxContext,
    id: string,
  ): Promise<ProcedureReference | undefined> {
    const row = await ctx.tx.query.procedureReferences.findFirst({
      where: eq(procedureReferences.id, id),
    });

    return row ? toProcedureReference(row) : undefined;
  }

  async update(
    ctx: DrizzleTxContext,
    id: string,
    input: UpdateProcedureReference,
  ): Promise<ProcedureReference | undefined> {
    const existing = await ctx.tx.query.procedureReferences.findFirst({
      where: eq(procedureReferences.id, id),
    });

    if (!existing) {
      return undefined;
    }

    const [row] = await ctx.tx
      .update(procedureReferences)
      .set({
        code: input.code ?? existing.code,
        display: input.display ?? existing.display,
        updatedAt: new Date(),
      })
      .where(eq(procedureReferences.id, id))
      .returning();

    return toProcedureReference(row!);
  }

  async remove(ctx: DrizzleTxContext, id: string): Promise<boolean> {
    const rows = await ctx.tx
      .delete(procedureReferences)
      .where(eq(procedureReferences.id, id))
      .returning({ id: procedureReferences.id });

    return rows.length > 0;
  }
}