import type { NewObservation, Observation, UpdateObservation } from "@simk/contracts";
import type { TxContext } from "./database.js";

export type ObservationsRepository<TxCtx extends TxContext<any>> = {
  create(ctx: TxCtx, input: NewObservation): Promise<Observation>;
  list(
    ctx: TxCtx,
    limit: number,
    patientId?: string,
    visitId?: string,
    status?: Observation["status"],
    offset?: number,
  ): Promise<Observation[]>;
  getById(ctx: TxCtx, id: string): Promise<Observation | undefined>;
  update(
    ctx: TxCtx,
    id: string,
    input: UpdateObservation,
    expectedVersion: number,
  ): Promise<Observation | undefined>;
  updateStatus(
    ctx: TxCtx,
    id: string,
    status: Observation["status"],
    expectedVersion: number,
  ): Promise<Observation | undefined>;
  markEnteredInError(ctx: TxCtx, id: string): Promise<void>;
};
