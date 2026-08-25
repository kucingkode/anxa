import { randomUUID } from "node:crypto";
import type { NewProcedureReference, ProcedureReference, UpdateProcedureReference } from "@simk/contracts";
import {
  OUTBOUND_DIRECTION,
  PROCEDURE_REFERENCES_REPOSITORY_PORT,
} from "../../../../constants.js";
import { ProcedureReferencesRepositoryError } from "../../../../domain/errors/infrastructure-errors.js";
import type { ProcedureReferencesRepository } from "../../../../domain/ports/out/database/procedure-references-repository.js";
import { BaseAdapter } from "../../../../shared/classes/base-adapter.js";
import type { MemoryTxContext } from "./database.js";

export class MemoryProcedureReferencesRepository
  extends BaseAdapter
  implements ProcedureReferencesRepository<MemoryTxContext>
{
  private readonly procedureReferences = new Map<string, ProcedureReference>();

  constructor() {
    super(PROCEDURE_REFERENCES_REPOSITORY_PORT, OUTBOUND_DIRECTION, ProcedureReferencesRepositoryError);
  }

  async create(
    _ctx: MemoryTxContext,
    input: NewProcedureReference,
  ): Promise<ProcedureReference> {
    const now = new Date().toISOString();
    const ref: ProcedureReference = {
      id: randomUUID(),
      createdAt: now,
      updatedAt: now,
      ...input,
    };
    this.procedureReferences.set(ref.id, ref);
    return ref;
  }

  async list(
    _ctx: MemoryTxContext,
    limit: number,
    query?: string,
    offset = 0,
  ): Promise<ProcedureReference[]> {
    const matches = [...this.procedureReferences.values()];
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
  ): Promise<ProcedureReference | undefined> {
    return this.procedureReferences.get(id);
  }

  async update(
    _ctx: MemoryTxContext,
    id: string,
    input: UpdateProcedureReference,
  ): Promise<ProcedureReference | undefined> {
    const ref = this.procedureReferences.get(id);
    if (!ref) return undefined;

    const updated: ProcedureReference = {
      ...ref,
      code: input.code ?? ref.code,
      display: input.display ?? ref.display,
      updatedAt: new Date().toISOString(),
    };
    this.procedureReferences.set(id, updated);
    return updated;
  }

  async remove(_ctx: MemoryTxContext, id: string): Promise<boolean> {
    if (!this.procedureReferences.has(id)) {
      return false;
    }
    return this.procedureReferences.delete(id);
  }
}