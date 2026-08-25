import { randomUUID } from "node:crypto";
import type { Visit } from "@simk/contracts";
import {
  OUTBOUND_DIRECTION,
  VISITS_REPOSITORY_PORT,
} from "../../../../constants.js";
import { VisitsRepositoryError } from "../../../../domain/errors/infrastructure-errors.js";
import type {
  CreateVisitParams,
  VisitsRepository,
} from "../../../../domain/ports/out/database/visits-repository.js";
import { BaseAdapter } from "../../../../shared/classes/base-adapter.js";
import type { MemoryTxContext } from "./database.js";

export class MemoryVisitsRepository
  extends BaseAdapter
  implements VisitsRepository<MemoryTxContext>
{
  private readonly visits = new Map<string, Visit>();

  constructor() {
    super(VISITS_REPOSITORY_PORT, OUTBOUND_DIRECTION, VisitsRepositoryError);
  }

  async create(_ctx: MemoryTxContext, input: CreateVisitParams): Promise<Visit> {
    const now = new Date().toISOString();
    const visit: Visit = {
      id: randomUUID(),
      patientId: input.patientId,
      status: input.status,
      class: input.class,
      createdAt: now,
      updatedAt: now,
    };
    this.visits.set(visit.id, visit);
    return visit;
  }

  async list(
    _ctx: MemoryTxContext,
    limit: number,
    patientId?: string,
    status?: Visit["status"],
    offset = 0,
  ): Promise<Visit[]> {
    const matches = [...this.visits.values()].filter((v) => {
      if (patientId && v.patientId !== patientId) return false;
      if (status && v.status !== status) return false;
      return true;
    });
    return matches.slice(offset, offset + limit);
  }

  async getById(
    _ctx: MemoryTxContext,
    id: string,
  ): Promise<Visit | undefined> {
    return this.visits.get(id);
  }

  async updateStatus(
    _ctx: MemoryTxContext,
    id: string,
    status: Visit["status"],
  ): Promise<void> {
    const visit = this.visits.get(id);
    if (!visit) return;

    this.visits.set(id, {
      ...visit,
      status,
      updatedAt: new Date().toISOString(),
    });
  }
}
