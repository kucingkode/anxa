import { LIST_FOLLOW_UP_VISITS_USE_CASE, READ_ONLY_DB_TX } from "../../../constants.js";
import type {
  ListFollowUpVisitsInput,
  ListFollowUpVisitsOutput,
  ListFollowUpVisitsUseCase,
} from "../../../domain/ports/in/follow-up-visits/list-follow-up-visits.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { FollowUpVisitsRepository } from "../../../domain/ports/out/database/follow-up-visits-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type ListFollowUpVisitsServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  followUpVisitsRepository: FollowUpVisitsRepository<TxCtx>;
};

export class ListFollowUpVisitsService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements ListFollowUpVisitsUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly followUpVisitsRepository: FollowUpVisitsRepository<TxCtx>;

  constructor(deps: ListFollowUpVisitsServiceDeps<TxCtx>) {
    super(LIST_FOLLOW_UP_VISITS_USE_CASE);

    this.db = deps.db;
    this.followUpVisitsRepository = deps.followUpVisitsRepository;
  }

  async listFollowUpVisits(
    input: ListFollowUpVisitsInput,
  ): Promise<ListFollowUpVisitsOutput> {
    return this.db.beginTx(
      (ctx) =>
        this.followUpVisitsRepository.list(
          ctx,
          input.limit ?? 20,
          input.patientId,
          input.status,
          input.date,
          input.offset ?? 0,
        ),
      READ_ONLY_DB_TX,
    );
  }
}
