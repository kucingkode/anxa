import type { NewQueue, Queue } from "@simk/contracts";
import type { TxContext } from "./database.js";

export type QueuesRepository<TxCtx extends TxContext<any>> = {
  create(ctx: TxCtx, input: NewQueue): Promise<Queue>;
  list(
    ctx: TxCtx,
    limit: number,
    patientId?: string,
    status?: Queue["status"],
    offset?: number,
  ): Promise<Queue[]>;
  getById(ctx: TxCtx, id: string): Promise<Queue | undefined>;
  findActiveByPatientId(
    ctx: TxCtx,
    patientId: string,
  ): Promise<Queue | undefined>;
  update(
    ctx: TxCtx,
    id: string,
    status: Queue["status"],
    expectedVersion: number,
    visitId?: string,
  ): Promise<Queue | undefined>;
  remove(ctx: TxCtx, id: string): Promise<boolean>;
};
