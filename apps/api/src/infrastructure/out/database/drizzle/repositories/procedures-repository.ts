import { randomUUID } from "node:crypto";
import { and, eq, isNull } from "drizzle-orm";
import type { NewProcedure, Procedure, UpdateProcedure } from "@simk/contracts";
import {
  OUTBOUND_DIRECTION,
  PROCEDURES_REPOSITORY_PORT,
} from "../../../../../constants.js";
import { ProceduresRepositoryError } from "../../../../../domain/errors/infrastructure-errors.js";
import type { ProceduresRepository } from "../../../../../domain/ports/out/database/procedures-repository.js";
import { BaseAdapter } from "../../../../../shared/classes/base-adapter.js";
import type { DrizzleTxContext } from "../database.js";
import { procedures } from "../schema.js";

function toProcedure(row: typeof procedures.$inferSelect): Procedure {
  return {
    id: row.id,
    patientId: row.patientId,
    visitId: row.visitId,
    code: row.code,
    codeDisplay: row.codeDisplay ?? undefined,
    status: row.status ?? undefined,
    performedAt: row.performedAt?.toISOString(),
    notes: row.notes ?? undefined,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export class DrizzleProceduresRepository
  extends BaseAdapter
  implements ProceduresRepository<DrizzleTxContext>
{
  constructor() {
    super(
      PROCEDURES_REPOSITORY_PORT,
      OUTBOUND_DIRECTION,
      ProceduresRepositoryError,
    );
  }

  async create(
    ctx: DrizzleTxContext,
    input: NewProcedure,
  ): Promise<Procedure> {
    const now = new Date();

    const [row] = await ctx.tx
      .insert(procedures)
      .values({
        id: randomUUID(),
        patientId: input.patientId,
        visitId: input.visitId,
        code: input.code,
        codeDisplay: input.codeDisplay,
        status: input.status,
        performedAt: input.performedAt ? new Date(input.performedAt) : undefined,
        notes: input.notes,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return toProcedure(row!);
  }

  async list(
    ctx: DrizzleTxContext,
    limit: number,
    patientId?: string,
    visitId?: string,
    offset = 0,
  ): Promise<Procedure[]> {
    const conds = [isNull(procedures.deletedAt)];
    if (patientId) conds.push(eq(procedures.patientId, patientId));
    if (visitId) conds.push(eq(procedures.visitId, visitId));

    const rows = await ctx.tx.query.procedures.findMany({
      where: and(...conds),
      limit,
      offset,
    });

    return rows.map(toProcedure);
  }

  async getById(
    ctx: DrizzleTxContext,
    id: string,
  ): Promise<Procedure | undefined> {
    const row = await ctx.tx.query.procedures.findFirst({
      where: and(eq(procedures.id, id), isNull(procedures.deletedAt)),
    });

    return row ? toProcedure(row) : undefined;
  }

  async update(
    ctx: DrizzleTxContext,
    id: string,
    input: UpdateProcedure,
  ): Promise<Procedure | undefined> {
    const existing = await ctx.tx.query.procedures.findFirst({
      where: and(eq(procedures.id, id), isNull(procedures.deletedAt)),
    });

    if (!existing) {
      return undefined;
    }

    const [row] = await ctx.tx
      .update(procedures)
      .set({
        codeDisplay: input.codeDisplay ?? existing.codeDisplay,
        status: input.status ?? existing.status,
        performedAt: input.performedAt
          ? new Date(input.performedAt)
          : existing.performedAt,
        notes: input.notes ?? existing.notes,
        updatedAt: new Date(),
      })
      .where(eq(procedures.id, id))
      .returning();

    return toProcedure(row!);
  }

  async remove(ctx: DrizzleTxContext, id: string): Promise<boolean> {
    const rows = await ctx.tx
      .update(procedures)
      .set({ deletedAt: new Date() })
      .where(and(eq(procedures.id, id), isNull(procedures.deletedAt)))
      .returning({ id: procedures.id });

    return rows.length > 0;
  }
}
