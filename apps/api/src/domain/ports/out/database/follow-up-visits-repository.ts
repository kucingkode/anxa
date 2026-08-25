import type { NewFollowUpVisit, FollowUpVisit, UpdateFollowUpVisit } from "@simk/contracts";
import type { TxContext } from "./database.js";

export type FollowUpVisitsRepository<TxCtx extends TxContext<any>> = {
  create(ctx: TxCtx, input: NewFollowUpVisit): Promise<FollowUpVisit>;
  list(
    ctx: TxCtx,
    limit: number,
    patientId?: string,
    status?: FollowUpVisit["status"],
    date?: string,
    offset?: number,
  ): Promise<FollowUpVisit[]>;
  getById(ctx: TxCtx, id: string): Promise<FollowUpVisit | undefined>;
  update(
    ctx: TxCtx,
    id: string,
    input: UpdateFollowUpVisit,
  ): Promise<FollowUpVisit | undefined>;
};
