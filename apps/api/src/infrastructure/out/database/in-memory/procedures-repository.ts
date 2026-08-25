import { randomUUID } from "node:crypto";
import type { NewProcedure, Procedure, UpdateProcedure } from "@simk/contracts";
import {
  OUTBOUND_DIRECTION,
  PROCEDURES_REPOSITORY_PORT,
} from "../../../../constants.js";
import { ProceduresRepositoryError } from "../../../../domain/errors/infrastructure-errors.js";
import type { ProceduresRepository } from "../../../../domain/ports/out/database/procedures-repository.js";
import { BaseAdapter } from "../../../../shared/classes/base-adapter.js";
import type { MemoryTxContext } from "./database.js";

export class MemoryProceduresRepository
  extends BaseAdapter
  implements ProceduresRepository<MemoryTxContext>
{
  private readonly procedures = new Map<string, Procedure>();
  private readonly deleted = new Set<string>();

  constructor() {
    super(PROCEDURES_REPOSITORY_PORT, OUTBOUND_DIRECTION, ProceduresRepositoryError);
  }

  async create(
    _ctx: MemoryTxContext,
    input: NewProcedure,
  ): Promise<Procedure> {
    const now = new Date().toISOString();
    const procedure: Procedure = {
      id: randomUUID(),
      patientId: input.patientId,
      visitId: input.visitId,
      code: input.code,
      codeDisplay: input.codeDisplay,
      status: input.status,
      performedAt: input.performedAt,
      notes: input.notes,
      createdAt: now,
      updatedAt: now,
    };
    this.procedures.set(procedure.id, procedure);
    return procedure;
  }

  async list(
    _ctx: MemoryTxContext,
    limit: number,
    patientId?: string,
    visitId?: string,
    offset = 0,
  ): Promise<Procedure[]> {
    const matches = [...this.procedures.values()].filter((p) => {
      if (this.deleted.has(p.id)) return false;
      if (patientId && p.patientId !== patientId) return false;
      if (visitId && p.visitId !== visitId) return false;
      return true;
    });
    return matches.slice(offset, offset + limit);
  }

  async getById(
    _ctx: MemoryTxContext,
    id: string,
  ): Promise<Procedure | undefined> {
    const procedure = this.procedures.get(id);
    return procedure && !this.deleted.has(id) ? procedure : undefined;
  }

  async update(
    _ctx: MemoryTxContext,
    id: string,
    input: UpdateProcedure,
  ): Promise<Procedure | undefined> {
    const procedure = this.procedures.get(id);
    if (!procedure || this.deleted.has(id)) return undefined;

    const updated: Procedure = {
      ...procedure,
      codeDisplay: input.codeDisplay ?? procedure.codeDisplay,
      status: input.status ?? procedure.status,
      performedAt: input.performedAt ?? procedure.performedAt,
      notes: input.notes ?? procedure.notes,
      updatedAt: new Date().toISOString(),
    };
    this.procedures.set(id, updated);
    return updated;
  }

  async remove(_ctx: MemoryTxContext, id: string): Promise<boolean> {
    if (!this.procedures.has(id) || this.deleted.has(id)) return false;
    this.deleted.add(id);
    return true;
  }
}
