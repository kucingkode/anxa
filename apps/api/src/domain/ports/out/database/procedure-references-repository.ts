import type { NewProcedureReference, ProcedureReference, UpdateProcedureReference } from "@simk/contracts";
import type { TxContext } from "./database.js";

export type ProcedureReferencesRepository<TxCtx extends TxContext<any>> = {
  create(ctx: TxCtx, input: NewProcedureReference): Promise<ProcedureReference>;
  list(ctx: TxCtx, limit: number, query?: string, offset?: number): Promise<ProcedureReference[]>;
  getById(ctx: TxCtx, id: string): Promise<ProcedureReference | undefined>;
  update(ctx: TxCtx, id: string, input: UpdateProcedureReference): Promise<ProcedureReference | undefined>;
  remove(ctx: TxCtx, id: string): Promise<boolean>;
};