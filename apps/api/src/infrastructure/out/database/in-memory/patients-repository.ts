import { randomUUID } from "node:crypto";
import type { NewPatient, Patient, UpdatePatient } from "@simk/contracts";
import {
  OUTBOUND_DIRECTION,
  PATIENTS_REPOSITORY_PORT,
} from "../../../../constants.js";
import { PatientsRepositoryError } from "../../../../domain/errors/infrastructure-errors.js";
import type { PatientsRepository } from "../../../../domain/ports/out/database/patients-repository.js";
import { BaseAdapter } from "../../../../shared/classes/base-adapter.js";
import type { MemoryTxContext } from "./database.js";

export class MemoryPatientsRepository
  extends BaseAdapter
  implements PatientsRepository<MemoryTxContext>
{
  private readonly patients = new Map<string, Patient>();
  private readonly deleted = new Set<string>();

  constructor() {
    super(PATIENTS_REPOSITORY_PORT, OUTBOUND_DIRECTION, PatientsRepositoryError);
  }

  async create(
    _ctx: MemoryTxContext,
    input: NewPatient,
  ): Promise<Patient> {
    const now = new Date().toISOString();
    const patient: Patient = {
      id: randomUUID(),
      createdAt: now,
      ...input,
    };
    this.patients.set(patient.id, patient);
    return patient;
  }

  async list(
    _ctx: MemoryTxContext,
    limit: number,
    query?: string,
    offset = 0,
  ): Promise<Patient[]> {
    const matches = [...this.patients.values()].filter(
      (p) => !this.deleted.has(p.id),
    );
    const filtered = query
      ? matches.filter((p) => {
          const needle = query.toLowerCase();
          return (
            p.name.toLowerCase().includes(needle) ||
            p.identifier.toLowerCase().includes(needle)
          );
        })
      : matches;

    return filtered.slice(offset, offset + limit);
  }

  async getById(
    _ctx: MemoryTxContext,
    id: string,
  ): Promise<Patient | undefined> {
    const patient = this.patients.get(id);
    return patient && !this.deleted.has(id) ? patient : undefined;
  }

  async findByIdentifier(
    _ctx: MemoryTxContext,
    identifier: string,
  ): Promise<Patient | undefined> {
    for (const patient of this.patients.values()) {
      if (!this.deleted.has(patient.id) && patient.identifier === identifier) {
        return patient;
      }
    }
    return undefined;
  }

  async update(
    ctx: MemoryTxContext,
    id: string,
    input: UpdatePatient,
  ): Promise<Patient | undefined> {
    const patient = await this.getById(ctx, id);
    if (!patient) {
      return undefined;
    }

    const updated: Patient = {
      ...patient,
      name: input.name ?? patient.name,
      gender: input.gender ?? patient.gender,
      birthDate: input.birthDate ?? patient.birthDate,
      phone: input.phone ?? patient.phone,
    };
    this.patients.set(id, updated);
    return updated;
  }

  async remove(_ctx: MemoryTxContext, id: string): Promise<boolean> {
    if (!this.patients.has(id) || this.deleted.has(id)) {
      return false;
    }
    this.deleted.add(id);
    return true;
  }
}
