import { randomUUID } from "node:crypto";
import { and, eq } from "drizzle-orm";
import type { Visit } from "@simk/contracts";
import {
  OUTBOUND_DIRECTION,
  VISITS_REPOSITORY_PORT,
} from "../../../../../constants.js";
import { VisitsRepositoryError } from "../../../../../domain/errors/infrastructure-errors.js";
import type {
  CreateVisitParams,
  VisitsRepository,
} from "../../../../../domain/ports/out/database/visits-repository.js";
import { BaseAdapter } from "../../../../../shared/classes/base-adapter.js";
import type { DrizzleTxContext } from "../database.js";
import { visits } from "../schema.js";

function toVisit(row: typeof visits.$inferSelect): Visit {
  return {
    id: row.id,
    patientId: row.patientId,
    status: row.status,
    class: row.class,
    periodStart: row.periodStart?.toISOString(),
    periodEnd: row.periodEnd?.toISOString(),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export class DrizzleVisitsRepository
  extends BaseAdapter
  implements VisitsRepository<DrizzleTxContext>
{
  constructor() {
    super(VISITS_REPOSITORY_PORT, OUTBOUND_DIRECTION, VisitsRepositoryError);
  }

  async create(ctx: DrizzleTxContext, input: CreateVisitParams): Promise<Visit> {
    const now = new Date();

    const [row] = await ctx.tx
      .insert(visits)
      .values({
        id: randomUUID(),
        patientId: input.patientId,
        status: input.status,
        class: input.class,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return toVisit(row!);
  }

  async list(
    ctx: DrizzleTxContext,
    limit: number,
    patientId?: string,
    status?: Visit["status"],
    offset = 0,
  ): Promise<Visit[]> {
    const conditions = [];
    if (patientId) conditions.push(eq(visits.patientId, patientId));
    if (status) conditions.push(eq(visits.status, status));

    const rows = await ctx.tx.query.visits.findMany({
      where: conditions.length ? and(...conditions) : undefined,
      limit,
      offset,
    });

    return rows.map(toVisit);
  }

  async getById(
    ctx: DrizzleTxContext,
    id: string,
  ): Promise<Visit | undefined> {
    const row = await ctx.tx.query.visits.findFirst({
      where: eq(visits.id, id),
    });

    return row ? toVisit(row) : undefined;
  }

  async updateStatus(
    ctx: DrizzleTxContext,
    id: string,
    status: Visit["status"],
  ): Promise<void> {
    await ctx.tx
      .update(visits)
      .set({ status, updatedAt: new Date() })
      .where(eq(visits.id, id));
  }
}
