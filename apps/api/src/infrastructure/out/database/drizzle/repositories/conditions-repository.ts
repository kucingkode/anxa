import { randomUUID } from "node:crypto";
import { and, eq, isNull } from "drizzle-orm";
import type { NewCondition, Condition, UpdateCondition } from "@simk/contracts";
import {
  CONDITIONS_REPOSITORY_PORT,
  OUTBOUND_DIRECTION,
} from "../../../../../constants.js";
import { ConditionsRepositoryError } from "../../../../../domain/errors/infrastructure-errors.js";
import type { ConditionsRepository } from "../../../../../domain/ports/out/database/conditions-repository.js";
import { BaseAdapter } from "../../../../../shared/classes/base-adapter.js";
import type { DrizzleTxContext } from "../database.js";
import { conditions } from "../schema.js";

function toCondition(row: typeof conditions.$inferSelect): Condition {
  return {
    id: row.id,
    patientId: row.patientId,
    visitId: row.visitId,
    code: row.code,
    codeDisplay: row.codeDisplay ?? undefined,
    clinicalStatus: row.clinicalStatus ?? undefined,
    notes: row.notes ?? undefined,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export class DrizzleConditionsRepository
  extends BaseAdapter
  implements ConditionsRepository<DrizzleTxContext>
{
  constructor() {
    super(CONDITIONS_REPOSITORY_PORT, OUTBOUND_DIRECTION, ConditionsRepositoryError);
  }

  async create(
    ctx: DrizzleTxContext,
    input: NewCondition,
  ): Promise<Condition> {
    const now = new Date();

    const [row] = await ctx.tx
      .insert(conditions)
      .values({
        id: randomUUID(),
        patientId: input.patientId,
        visitId: input.visitId,
        code: input.code,
        codeDisplay: input.codeDisplay,
        clinicalStatus: input.clinicalStatus,
        notes: input.notes,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return toCondition(row!);
  }

  async list(
    ctx: DrizzleTxContext,
    limit: number,
    patientId?: string,
    visitId?: string,
    offset = 0,
  ): Promise<Condition[]> {
    const conds = [isNull(conditions.deletedAt)];
    if (patientId) conds.push(eq(conditions.patientId, patientId));
    if (visitId) conds.push(eq(conditions.visitId, visitId));

    const rows = await ctx.tx.query.conditions.findMany({
      where: and(...conds),
      limit,
      offset,
    });

    return rows.map(toCondition);
  }

  async getById(
    ctx: DrizzleTxContext,
    id: string,
  ): Promise<Condition | undefined> {
    const row = await ctx.tx.query.conditions.findFirst({
      where: and(eq(conditions.id, id), isNull(conditions.deletedAt)),
    });

    return row ? toCondition(row) : undefined;
  }

  async update(
    ctx: DrizzleTxContext,
    id: string,
    input: UpdateCondition,
  ): Promise<Condition | undefined> {
    const existing = await ctx.tx.query.conditions.findFirst({
      where: and(eq(conditions.id, id), isNull(conditions.deletedAt)),
    });

    if (!existing) {
      return undefined;
    }

    const [row] = await ctx.tx
      .update(conditions)
      .set({
        codeDisplay: input.codeDisplay ?? existing.codeDisplay,
        clinicalStatus: input.clinicalStatus ?? existing.clinicalStatus,
        notes: input.notes ?? existing.notes,
        updatedAt: new Date(),
      })
      .where(eq(conditions.id, id))
      .returning();

    return toCondition(row!);
  }

  async remove(ctx: DrizzleTxContext, id: string): Promise<boolean> {
    const rows = await ctx.tx
      .update(conditions)
      .set({ deletedAt: new Date() })
      .where(and(eq(conditions.id, id), isNull(conditions.deletedAt)))
      .returning({ id: conditions.id });

    return rows.length > 0;
  }
}
