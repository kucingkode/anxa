import { randomUUID } from "node:crypto";
import type { NewFollowUpVisit, FollowUpVisit, UpdateFollowUpVisit } from "@simk/contracts";
import {
  FOLLOW_UP_VISITS_REPOSITORY_PORT,
  OUTBOUND_DIRECTION,
} from "../../../../constants.js";
import { FollowUpVisitsRepositoryError } from "../../../../domain/errors/infrastructure-errors.js";
import type { FollowUpVisitsRepository } from "../../../../domain/ports/out/database/follow-up-visits-repository.js";
import { BaseAdapter } from "../../../../shared/classes/base-adapter.js";
import type { MemoryTxContext } from "./database.js";

export class MemoryFollowUpVisitsRepository
  extends BaseAdapter
  implements FollowUpVisitsRepository<MemoryTxContext>
{
  private readonly followUpVisits = new Map<string, FollowUpVisit>();

  constructor() {
    super(
      FOLLOW_UP_VISITS_REPOSITORY_PORT,
      OUTBOUND_DIRECTION,
      FollowUpVisitsRepositoryError,
    );
  }

  async create(
    _ctx: MemoryTxContext,
    input: NewFollowUpVisit,
  ): Promise<FollowUpVisit> {
    const now = new Date().toISOString();
    const followUpVisit: FollowUpVisit = {
      id: randomUUID(),
      patientId: input.patientId,
      date: input.date,
      status: "booked",
      reason: input.reason,
      createdAt: now,
      updatedAt: now,
    };
    this.followUpVisits.set(followUpVisit.id, followUpVisit);
    return followUpVisit;
  }

  async list(
    _ctx: MemoryTxContext,
    limit: number,
    patientId?: string,
    status?: FollowUpVisit["status"],
    date?: string,
    offset = 0,
  ): Promise<FollowUpVisit[]> {
    const matches = [...this.followUpVisits.values()].filter((f) => {
      if (patientId && f.patientId !== patientId) return false;
      if (status && f.status !== status) return false;
      if (date && f.date !== date) return false;
      return true;
    });
    return matches.slice(offset, offset + limit);
  }

  async getById(
    _ctx: MemoryTxContext,
    id: string,
  ): Promise<FollowUpVisit | undefined> {
    return this.followUpVisits.get(id);
  }

  async update(
    _ctx: MemoryTxContext,
    id: string,
    input: UpdateFollowUpVisit,
  ): Promise<FollowUpVisit | undefined> {
    const existing = this.followUpVisits.get(id);
    if (!existing) return undefined;

    const updated: FollowUpVisit = {
      ...existing,
      date: input.date ?? existing.date,
      status: input.status ?? existing.status,
      reason: input.reason ?? existing.reason,
      updatedAt: new Date().toISOString(),
    };
    this.followUpVisits.set(id, updated);
    return updated;
  }
}
