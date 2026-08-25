import { randomUUID } from "node:crypto";
import type { NewCondition, Condition, UpdateCondition } from "@simk/contracts";
import {
  CONDITIONS_REPOSITORY_PORT,
  OUTBOUND_DIRECTION,
} from "../../../../constants.js";
import { ConditionsRepositoryError } from "../../../../domain/errors/infrastructure-errors.js";
import type { ConditionsRepository } from "../../../../domain/ports/out/database/conditions-repository.js";
import { BaseAdapter } from "../../../../shared/classes/base-adapter.js";
import type { MemoryTxContext } from "./database.js";

export class MemoryConditionsRepository
  extends BaseAdapter
  implements ConditionsRepository<MemoryTxContext>
{
  private readonly conditions = new Map<string, Condition>();
  private readonly deleted = new Set<string>();

  constructor() {
    super(CONDITIONS_REPOSITORY_PORT, OUTBOUND_DIRECTION, ConditionsRepositoryError);
  }

  async create(
    _ctx: MemoryTxContext,
    input: NewCondition,
  ): Promise<Condition> {
    const now = new Date().toISOString();
    const condition: Condition = {
      id: randomUUID(),
      patientId: input.patientId,
      visitId: input.visitId,
      code: input.code,
      codeDisplay: input.codeDisplay,
      clinicalStatus: input.clinicalStatus,
      notes: input.notes,
      createdAt: now,
      updatedAt: now,
    };
    this.conditions.set(condition.id, condition);
    return condition;
  }

  async list(
    _ctx: MemoryTxContext,
    limit: number,
    patientId?: string,
    visitId?: string,
    offset = 0,
  ): Promise<Condition[]> {
    const matches = [...this.conditions.values()].filter((c) => {
      if (this.deleted.has(c.id)) return false;
      if (patientId && c.patientId !== patientId) return false;
      if (visitId && c.visitId !== visitId) return false;
      return true;
    });
    return matches.slice(offset, offset + limit);
  }

  async getById(
    _ctx: MemoryTxContext,
    id: string,
  ): Promise<Condition | undefined> {
    const condition = this.conditions.get(id);
    return condition && !this.deleted.has(id) ? condition : undefined;
  }

  async update(
    _ctx: MemoryTxContext,
    id: string,
    input: UpdateCondition,
  ): Promise<Condition | undefined> {
    const condition = this.conditions.get(id);
    if (!condition || this.deleted.has(id)) return undefined;

    const updated: Condition = {
      ...condition,
      codeDisplay: input.codeDisplay ?? condition.codeDisplay,
      clinicalStatus: input.clinicalStatus ?? condition.clinicalStatus,
      notes: input.notes ?? condition.notes,
      updatedAt: new Date().toISOString(),
    };
    this.conditions.set(id, updated);
    return updated;
  }

  async remove(_ctx: MemoryTxContext, id: string): Promise<boolean> {
    if (!this.conditions.has(id) || this.deleted.has(id)) return false;
    this.deleted.add(id);
    return true;
  }
}
