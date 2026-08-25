import type { NewConditionReference, ConditionReference, UpdateConditionReference } from "@simk/contracts";
import type { TxContext } from "./database.js";

export type ConditionReferencesRepository<TxCtx extends TxContext<any>> = {
  create(ctx: TxCtx, input: NewConditionReference): Promise<ConditionReference>;
  list(ctx: TxCtx, limit: number, query?: string, offset?: number): Promise<ConditionReference[]>;
  getById(ctx: TxCtx, id: string): Promise<ConditionReference | undefined>;
  update(ctx: TxCtx, id: string, input: UpdateConditionReference): Promise<ConditionReference | undefined>;
  remove(ctx: TxCtx, id: string): Promise<boolean>;
};