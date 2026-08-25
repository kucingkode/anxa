import type { NewPatient, Patient, UpdatePatient } from "@simk/contracts";
import type { TxContext } from "./database.js";

export type PatientsRepository<TxCtx extends TxContext<any>> = {
  create(ctx: TxCtx, input: NewPatient): Promise<Patient>;
  list(ctx: TxCtx, limit: number, query?: string, offset?: number): Promise<Patient[]>;
  getById(ctx: TxCtx, id: string): Promise<Patient | undefined>;
  findByIdentifier(
    ctx: TxCtx,
    identifier: string,
  ): Promise<Patient | undefined>;
  update(
    ctx: TxCtx,
    id: string,
    input: UpdatePatient,
  ): Promise<Patient | undefined>;
  remove(ctx: TxCtx, id: string): Promise<boolean>;
};
