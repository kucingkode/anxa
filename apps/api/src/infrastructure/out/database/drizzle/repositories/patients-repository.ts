import { randomUUID } from "node:crypto";
import { and, desc, eq, ilike, isNull, or } from "drizzle-orm";
import type { NewPatient, Patient, UpdatePatient } from "@simk/contracts";
import { OUTBOUND_DIRECTION, PATIENTS_REPOSITORY_PORT } from "../../../../../constants.js";
import { PatientsRepositoryError } from "../../../../../domain/errors/infrastructure-errors.js";
import type { PatientsRepository } from "../../../../../domain/ports/out/database/patients-repository.js";
import { BaseAdapter } from "../../../../../shared/classes/base-adapter.js";
import type { DrizzleTxContext } from "../database.js";
import { patients } from "../schema.js";

function toPatient(row: typeof patients.$inferSelect): Patient {
  return {
    id: row.id,
    name: row.name,
    identifier: row.identifier,
    gender: row.gender,
    birthDate: row.birthDate ?? undefined,
    phone: row.phone ?? undefined,
    createdAt: row.createdAt.toISOString(),
  };
}

export class DrizzlePatientsRepository
  extends BaseAdapter
  implements PatientsRepository<DrizzleTxContext>
{
  constructor() {
    super(PATIENTS_REPOSITORY_PORT, OUTBOUND_DIRECTION, PatientsRepositoryError);
  }

  async create(ctx: DrizzleTxContext, input: NewPatient): Promise<Patient> {
    const [row] = await ctx.tx
      .insert(patients)
      .values({
        id: randomUUID(),
        name: input.name,
        identifier: input.identifier,
        gender: input.gender,
        birthDate: input.birthDate,
        phone: input.phone,
        createdAt: new Date(),
      })
      .returning();

    return toPatient(row!);
  }

  async list(
    ctx: DrizzleTxContext,
    limit: number,
    query?: string,
    offset = 0,
  ): Promise<Patient[]> {
    const filter = query
      ? and(
          isNull(patients.deletedAt),
          or(
            ilike(patients.name, `%${query}%`),
            ilike(patients.identifier, `%${query}%`),
          ),
        )
      : isNull(patients.deletedAt);

    const rows = await ctx.tx.query.patients.findMany({
      where: filter,
      orderBy: desc(patients.createdAt),
      limit,
      offset,
    });

    return rows.map(toPatient);
  }

  async getById(
    ctx: DrizzleTxContext,
    id: string,
  ): Promise<Patient | undefined> {
    const row = await ctx.tx.query.patients.findFirst({
      where: and(eq(patients.id, id), isNull(patients.deletedAt)),
    });

    return row ? toPatient(row) : undefined;
  }

  async findByIdentifier(
    ctx: DrizzleTxContext,
    identifier: string,
  ): Promise<Patient | undefined> {
    const row = await ctx.tx.query.patients.findFirst({
      where: and(
        eq(patients.identifier, identifier),
        isNull(patients.deletedAt),
      ),
    });

    return row ? toPatient(row) : undefined;
  }

  async update(
    ctx: DrizzleTxContext,
    id: string,
    input: UpdatePatient,
  ): Promise<Patient | undefined> {
    const existing = await ctx.tx.query.patients.findFirst({
      where: and(eq(patients.id, id), isNull(patients.deletedAt)),
    });

    if (!existing) {
      return undefined;
    }

    const [row] = await ctx.tx
      .update(patients)
      .set({
        name: input.name ?? existing.name,
        gender: input.gender ?? existing.gender,
        birthDate: input.birthDate ?? existing.birthDate,
        phone: input.phone ?? existing.phone,
      })
      .where(eq(patients.id, id))
      .returning();

    return toPatient(row!);
  }

  async remove(ctx: DrizzleTxContext, id: string): Promise<boolean> {
    const now = new Date().toISOString();

    const rows = await ctx.tx
      .update(patients)
      .set({ deletedAt: now })
      .where(and(eq(patients.id, id), isNull(patients.deletedAt)))
      .returning({ id: patients.id });

    return rows.length > 0;
  }
}
