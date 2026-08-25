import { randomUUID } from "node:crypto";
import { and, eq, sql } from "drizzle-orm";
import type { NewObservation, Observation, UpdateObservation } from "@simk/contracts";
import {
  OBSERVATIONS_REPOSITORY_PORT,
  OUTBOUND_DIRECTION,
} from "../../../../../constants.js";
import { ObservationsRepositoryError } from "../../../../../domain/errors/infrastructure-errors.js";
import type { ObservationsRepository } from "../../../../../domain/ports/out/database/observations-repository.js";
import { BaseAdapter } from "../../../../../shared/classes/base-adapter.js";
import type { DrizzleTxContext } from "../database.js";
import { observations } from "../schema.js";

function toObservation(row: typeof observations.$inferSelect): Observation {
  return {
    id: row.id,
    patientId: row.patientId,
    visitId: row.visitId,
    code: row.code,
    codeDisplay: row.codeDisplay ?? undefined,
    value: row.value,
    unit: row.unit ?? undefined,
    status: row.status,
    interpretation: row.interpretation ?? undefined,
    version: row.version,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export class DrizzleObservationsRepository
  extends BaseAdapter
  implements ObservationsRepository<DrizzleTxContext>
{
  constructor() {
    super(
      OBSERVATIONS_REPOSITORY_PORT,
      OUTBOUND_DIRECTION,
      ObservationsRepositoryError,
    );
  }

  async create(
    ctx: DrizzleTxContext,
    input: NewObservation,
  ): Promise<Observation> {
    const now = new Date();

    const [row] = await ctx.tx
      .insert(observations)
      .values({
        id: randomUUID(),
        patientId: input.patientId,
        visitId: input.visitId,
        code: input.code,
        codeDisplay: input.codeDisplay,
        value: input.value,
        unit: input.unit,
        status: input.status ?? "preliminary",
        interpretation: input.interpretation,
        version: 0,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return toObservation(row!);
  }

  async list(
    ctx: DrizzleTxContext,
    limit: number,
    patientId?: string,
    visitId?: string,
    status?: Observation["status"],
    offset = 0,
  ): Promise<Observation[]> {
    const conditions = [];
    if (patientId) conditions.push(eq(observations.patientId, patientId));
    if (visitId) conditions.push(eq(observations.visitId, visitId));
    if (status) conditions.push(eq(observations.status, status));

    const rows = await ctx.tx.query.observations.findMany({
      where: conditions.length ? and(...conditions) : undefined,
      limit,
      offset,
    });

    return rows.map(toObservation);
  }

  async getById(
    ctx: DrizzleTxContext,
    id: string,
  ): Promise<Observation | undefined> {
    const row = await ctx.tx.query.observations.findFirst({
      where: eq(observations.id, id),
    });

    return row ? toObservation(row) : undefined;
  }

  async update(
    ctx: DrizzleTxContext,
    id: string,
    input: UpdateObservation,
    expectedVersion: number,
  ): Promise<Observation | undefined> {
    const existing = await ctx.tx.query.observations.findFirst({
      where: eq(observations.id, id),
    });

    if (!existing) {
      return undefined;
    }

    const [row] = await ctx.tx
      .update(observations)
      .set({
        value: input.value ?? existing.value,
        unit: input.unit ?? existing.unit,
        codeDisplay: input.codeDisplay ?? existing.codeDisplay,
        interpretation: input.interpretation ?? existing.interpretation,
        version: sql`${observations.version} + 1`,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(observations.id, id),
          eq(observations.version, expectedVersion),
        ),
      )
      .returning();

    return row ? toObservation(row) : undefined;
  }

  async updateStatus(
    ctx: DrizzleTxContext,
    id: string,
    status: Observation["status"],
    expectedVersion: number,
  ): Promise<Observation | undefined> {
    const [row] = await ctx.tx
      .update(observations)
      .set({
        status,
        version: sql`${observations.version} + 1`,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(observations.id, id),
          eq(observations.version, expectedVersion),
        ),
      )
      .returning();

    return row ? toObservation(row) : undefined;
  }

  async markEnteredInError(ctx: DrizzleTxContext, id: string): Promise<void> {
    await ctx.tx
      .update(observations)
      .set({ status: "entered-in-error", updatedAt: new Date() })
      .where(eq(observations.id, id));
  }
}
