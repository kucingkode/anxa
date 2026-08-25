import type { NewCondition, Condition, UpdateCondition } from "@simk/contracts";
import type { TxContext } from "./database.js";

export type ConditionsRepository<TxCtx extends TxContext<any>> = {
  create(ctx: TxCtx, input: NewCondition): Promise<Condition>;
  list(
    ctx: TxCtx,
    limit: number,
    patientId?: string,
    visitId?: string,
    offset?: number,
  ): Promise<Condition[]>;
  getById(ctx: TxCtx, id: string): Promise<Condition | undefined>;
  update(
    ctx: TxCtx,
    id: string,
    input: UpdateCondition,
  ): Promise<Condition | undefined>;
  remove(ctx: TxCtx, id: string): Promise<boolean>;
};
