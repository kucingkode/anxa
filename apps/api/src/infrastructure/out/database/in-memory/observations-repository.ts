import { randomUUID } from "node:crypto";
import type { NewObservation, Observation, UpdateObservation } from "@simk/contracts";
import {
  OBSERVATIONS_REPOSITORY_PORT,
  OUTBOUND_DIRECTION,
} from "../../../../constants.js";
import { ObservationsRepositoryError } from "../../../../domain/errors/infrastructure-errors.js";
import type { ObservationsRepository } from "../../../../domain/ports/out/database/observations-repository.js";
import { BaseAdapter } from "../../../../shared/classes/base-adapter.js";
import type { MemoryTxContext } from "./database.js";

export class MemoryObservationsRepository
  extends BaseAdapter
  implements ObservationsRepository<MemoryTxContext>
{
  private readonly observations = new Map<string, Observation>();

  constructor() {
    super(
      OBSERVATIONS_REPOSITORY_PORT,
      OUTBOUND_DIRECTION,
      ObservationsRepositoryError,
    );
  }

  async create(
    _ctx: MemoryTxContext,
    input: NewObservation,
  ): Promise<Observation> {
    const now = new Date().toISOString();
    const observation: Observation = {
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
    };
    this.observations.set(observation.id, observation);
    return observation;
  }

  async list(
    _ctx: MemoryTxContext,
    limit: number,
    patientId?: string,
    visitId?: string,
    status?: Observation["status"],
    offset = 0,
  ): Promise<Observation[]> {
    const matches = [...this.observations.values()].filter((o) => {
      if (patientId && o.patientId !== patientId) return false;
      if (visitId && o.visitId !== visitId) return false;
      if (status && o.status !== status) return false;
      return true;
    });
    return matches.slice(offset, offset + limit);
  }

  async getById(
    _ctx: MemoryTxContext,
    id: string,
  ): Promise<Observation | undefined> {
    return this.observations.get(id);
  }

  async update(
    _ctx: MemoryTxContext,
    id: string,
    input: UpdateObservation,
    expectedVersion: number,
  ): Promise<Observation | undefined> {
    const existing = this.observations.get(id);
    if (!existing || existing.version !== expectedVersion) {
      return undefined;
    }

    const updated: Observation = {
      ...existing,
      value: input.value ?? existing.value,
      unit: input.unit ?? existing.unit,
      codeDisplay: input.codeDisplay ?? existing.codeDisplay,
      interpretation: input.interpretation ?? existing.interpretation,
      version: existing.version + 1,
      updatedAt: new Date().toISOString(),
    };
    this.observations.set(id, updated);
    return updated;
  }

  async updateStatus(
    _ctx: MemoryTxContext,
    id: string,
    status: Observation["status"],
    expectedVersion: number,
  ): Promise<Observation | undefined> {
    const existing = this.observations.get(id);
    if (!existing || existing.version !== expectedVersion) {
      return undefined;
    }

    const updated: Observation = {
      ...existing,
      status,
      version: existing.version + 1,
      updatedAt: new Date().toISOString(),
    };
    this.observations.set(id, updated);
    return updated;
  }

  async markEnteredInError(_ctx: MemoryTxContext, id: string): Promise<void> {
    const existing = this.observations.get(id);
    if (!existing) return;

    this.observations.set(id, {
      ...existing,
      status: "entered-in-error",
      updatedAt: new Date().toISOString(),
    });
  }
}
