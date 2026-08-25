import type { NewProcedure, Procedure, UpdateProcedure } from "@simk/contracts";
import type { TxContext } from "./database.js";

export type ProceduresRepository<TxCtx extends TxContext<any>> = {
  create(ctx: TxCtx, input: NewProcedure): Promise<Procedure>;
  list(
    ctx: TxCtx,
    limit: number,
    patientId?: string,
    visitId?: string,
    offset?: number,
  ): Promise<Procedure[]>;
  getById(ctx: TxCtx, id: string): Promise<Procedure | undefined>;
  update(
    ctx: TxCtx,
    id: string,
    input: UpdateProcedure,
  ): Promise<Procedure | undefined>;
  remove(ctx: TxCtx, id: string): Promise<boolean>;
};
