import { randomUUID } from "node:crypto";
import { and, eq } from "drizzle-orm";
import type { NewFollowUpVisit, FollowUpVisit, UpdateFollowUpVisit } from "@simk/contracts";
import {
  FOLLOW_UP_VISITS_REPOSITORY_PORT,
  OUTBOUND_DIRECTION,
} from "../../../../../constants.js";
import { FollowUpVisitsRepositoryError } from "../../../../../domain/errors/infrastructure-errors.js";
import type { FollowUpVisitsRepository } from "../../../../../domain/ports/out/database/follow-up-visits-repository.js";
import { BaseAdapter } from "../../../../../shared/classes/base-adapter.js";
import type { DrizzleTxContext } from "../database.js";
import { followUpVisits } from "../schema.js";

function toFollowUpVisit(
  row: typeof followUpVisits.$inferSelect,
): FollowUpVisit {
  return {
    id: row.id,
    patientId: row.patientId,
    date: row.date.toISOString(),
    status: row.status,
    reason: row.reason ?? undefined,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export class DrizzleFollowUpVisitsRepository
  extends BaseAdapter
  implements FollowUpVisitsRepository<DrizzleTxContext>
{
  constructor() {
    super(
      FOLLOW_UP_VISITS_REPOSITORY_PORT,
      OUTBOUND_DIRECTION,
      FollowUpVisitsRepositoryError,
    );
  }

  async create(
    ctx: DrizzleTxContext,
    input: NewFollowUpVisit,
  ): Promise<FollowUpVisit> {
    const now = new Date();

    const [row] = await ctx.tx
      .insert(followUpVisits)
      .values({
        id: randomUUID(),
        patientId: input.patientId,
        date: new Date(input.date),
        status: "booked",
        reason: input.reason,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return toFollowUpVisit(row!);
  }

  async list(
    ctx: DrizzleTxContext,
    limit: number,
    patientId?: string,
    status?: FollowUpVisit["status"],
    date?: string,
    offset = 0,
  ): Promise<FollowUpVisit[]> {
    const conds = [];
    if (patientId) conds.push(eq(followUpVisits.patientId, patientId));
    if (status) conds.push(eq(followUpVisits.status, status));
    if (date) conds.push(eq(followUpVisits.date, new Date(date)));

    const rows = await ctx.tx.query.followUpVisits.findMany({
      where: conds.length ? and(...conds) : undefined,
      limit,
      offset,
    });

    return rows.map(toFollowUpVisit);
  }

  async getById(
    ctx: DrizzleTxContext,
    id: string,
  ): Promise<FollowUpVisit | undefined> {
    const row = await ctx.tx.query.followUpVisits.findFirst({
      where: eq(followUpVisits.id, id),
    });

    return row ? toFollowUpVisit(row) : undefined;
  }

  async update(
    ctx: DrizzleTxContext,
    id: string,
    input: UpdateFollowUpVisit,
  ): Promise<FollowUpVisit | undefined> {
    const existing = await ctx.tx.query.followUpVisits.findFirst({
      where: eq(followUpVisits.id, id),
    });

    if (!existing) {
      return undefined;
    }

    const [row] = await ctx.tx
      .update(followUpVisits)
      .set({
        date: input.date ? new Date(input.date) : existing.date,
        status: input.status ?? existing.status,
        reason: input.reason ?? existing.reason,
        updatedAt: new Date(),
      })
      .where(eq(followUpVisits.id, id))
      .returning();

    return toFollowUpVisit(row!);
  }
}
