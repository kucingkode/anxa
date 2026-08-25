import { randomUUID } from "node:crypto";
import type { ConditionReference, NewConditionReference, UpdateConditionReference } from "@simk/contracts";
import {
  CONDITION_REFERENCES_REPOSITORY_PORT,
  OUTBOUND_DIRECTION,
} from "../../../../constants.js";
import { ConditionReferencesRepositoryError } from "../../../../domain/errors/infrastructure-errors.js";
import type { ConditionReferencesRepository } from "../../../../domain/ports/out/database/condition-references-repository.js";
import { BaseAdapter } from "../../../../shared/classes/base-adapter.js";
import type { MemoryTxContext } from "./database.js";

export class MemoryConditionReferencesRepository
  extends BaseAdapter
  implements ConditionReferencesRepository<MemoryTxContext>
{
  private readonly conditionReferences = new Map<string, ConditionReference>();

  constructor() {
    super(CONDITION_REFERENCES_REPOSITORY_PORT, OUTBOUND_DIRECTION, ConditionReferencesRepositoryError);
  }

  async create(
    _ctx: MemoryTxContext,
    input: NewConditionReference,
  ): Promise<ConditionReference> {
    const now = new Date().toISOString();
    const ref: ConditionReference = {
      id: randomUUID(),
      createdAt: now,
      updatedAt: now,
      ...input,
    };
    this.conditionReferences.set(ref.id, ref);
    return ref;
  }

  async list(
    _ctx: MemoryTxContext,
    limit: number,
    query?: string,
    offset = 0,
  ): Promise<ConditionReference[]> {
    const matches = [...this.conditionReferences.values()];
    if (!query) {
      return matches.slice(offset, offset + limit);
    }

    const needle = query.toLowerCase();
    return matches
      .filter(
        (r) =>
          r.code.toLowerCase().includes(needle) ||
          r.display.toLowerCase().includes(needle),
      )
      .slice(offset, offset + limit);
  }

  async getById(
    _ctx: MemoryTxContext,
    id: string,
  ): Promise<ConditionReference | undefined> {
    return this.conditionReferences.get(id);
  }

  async update(
    _ctx: MemoryTxContext,
    id: string,
    input: UpdateConditionReference,
  ): Promise<ConditionReference | undefined> {
    const ref = this.conditionReferences.get(id);
    if (!ref) return undefined;

    const updated: ConditionReference = {
      ...ref,
      code: input.code ?? ref.code,
      display: input.display ?? ref.display,
      updatedAt: new Date().toISOString(),
    };
    this.conditionReferences.set(id, updated);
    return updated;
  }

  async remove(_ctx: MemoryTxContext, id: string): Promise<boolean> {
    if (!this.conditionReferences.has(id)) {
      return false;
    }
    return this.conditionReferences.delete(id);
  }
}