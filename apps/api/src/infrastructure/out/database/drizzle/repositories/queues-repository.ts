import { randomUUID } from "node:crypto";
import { and, eq, isNull, or, sql } from "drizzle-orm";
import type { NewQueue, Queue } from "@simk/contracts";
import {
  OUTBOUND_DIRECTION,
  QUEUES_REPOSITORY_PORT,
} from "../../../../../constants.js";
import { QueuesRepositoryError } from "../../../../../domain/errors/infrastructure-errors.js";
import type { QueuesRepository } from "../../../../../domain/ports/out/database/queues-repository.js";
import { BaseAdapter } from "../../../../../shared/classes/base-adapter.js";
import type { DrizzleTxContext } from "../database.js";
import { queues } from "../schema.js";

function toQueue(row: typeof queues.$inferSelect): Queue {
  return {
    id: row.id,
    patientId: row.patientId,
    visitId: row.visitId ?? undefined,
    status: row.status,
    version: row.version,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export class DrizzleQueuesRepository
  extends BaseAdapter
  implements QueuesRepository<DrizzleTxContext>
{
  constructor() {
    super(QUEUES_REPOSITORY_PORT, OUTBOUND_DIRECTION, QueuesRepositoryError);
  }

  async create(ctx: DrizzleTxContext, input: NewQueue): Promise<Queue> {
    const now = new Date();

    const [row] = await ctx.tx
      .insert(queues)
      .values({
        id: randomUUID(),
        patientId: input.patientId,
        status: "waiting",
        version: 0,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return toQueue(row!);
  }

  async list(
    ctx: DrizzleTxContext,
    limit: number,
    patientId?: string,
    status?: Queue["status"],
    offset = 0,
  ): Promise<Queue[]> {
    const conditions = [isNull(queues.deletedAt)];
    if (patientId) conditions.push(eq(queues.patientId, patientId));
    if (status) conditions.push(eq(queues.status, status));

    const rows = await ctx.tx.query.queues.findMany({
      where: and(...conditions),
      limit,
      offset,
    });

    return rows.map(toQueue);
  }

  async getById(
    ctx: DrizzleTxContext,
    id: string,
  ): Promise<Queue | undefined> {
    const row = await ctx.tx.query.queues.findFirst({
      where: and(eq(queues.id, id), isNull(queues.deletedAt)),
    });

    return row ? toQueue(row) : undefined;
  }

  async findActiveByPatientId(
    ctx: DrizzleTxContext,
    patientId: string,
  ): Promise<Queue | undefined> {
    const row = await ctx.tx.query.queues.findFirst({
      where: and(
        eq(queues.patientId, patientId),
        isNull(queues.deletedAt),
        or(eq(queues.status, "waiting"), eq(queues.status, "in-service")),
      ),
    });

    return row ? toQueue(row) : undefined;
  }

  async update(
    ctx: DrizzleTxContext,
    id: string,
    status: Queue["status"],
    expectedVersion: number,
    visitId?: string,
  ): Promise<Queue | undefined> {
    const [row] = await ctx.tx
      .update(queues)
      .set({
        status,
        version: sql`${queues.version} + 1`,
        updatedAt: new Date(),
        ...(visitId !== undefined ? { visitId } : {}),
      })
      .where(
        and(
          eq(queues.id, id),
          isNull(queues.deletedAt),
          eq(queues.version, expectedVersion),
        ),
      )
      .returning();

    return row ? toQueue(row) : undefined;
  }

  async remove(ctx: DrizzleTxContext, id: string): Promise<boolean> {
    const rows = await ctx.tx
      .update(queues)
      .set({ deletedAt: new Date() })
      .where(and(eq(queues.id, id), isNull(queues.deletedAt)))
      .returning({ id: queues.id });

    return rows.length > 0;
  }
}
