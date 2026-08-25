import type { Visit } from "@simk/contracts";
import type { TxContext } from "./database.js";

export type CreateVisitParams = {
  patientId: string;
  status: Visit["status"];
  class: string;
};

export type VisitsRepository<TxCtx extends TxContext<any>> = {
  create(ctx: TxCtx, input: CreateVisitParams): Promise<Visit>;
  list(
    ctx: TxCtx,
    limit: number,
    patientId?: string,
    status?: Visit["status"],
    offset?: number,
  ): Promise<Visit[]>;
  getById(ctx: TxCtx, id: string): Promise<Visit | undefined>;
  updateStatus(ctx: TxCtx, id: string, status: Visit["status"]): Promise<void>;
};
