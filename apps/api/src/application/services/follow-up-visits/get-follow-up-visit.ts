import { GET_FOLLOW_UP_VISIT_USE_CASE, READ_ONLY_DB_TX } from "../../../constants.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  GetFollowUpVisitInput,
  GetFollowUpVisitOutput,
  GetFollowUpVisitUseCase,
} from "../../../domain/ports/in/follow-up-visits/get-follow-up-visit.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { FollowUpVisitsRepository } from "../../../domain/ports/out/database/follow-up-visits-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type GetFollowUpVisitServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  followUpVisitsRepository: FollowUpVisitsRepository<TxCtx>;
};

export class GetFollowUpVisitService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements GetFollowUpVisitUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly followUpVisitsRepository: FollowUpVisitsRepository<TxCtx>;

  constructor(deps: GetFollowUpVisitServiceDeps<TxCtx>) {
    super(GET_FOLLOW_UP_VISIT_USE_CASE);

    this.db = deps.db;
    this.followUpVisitsRepository = deps.followUpVisitsRepository;
  }

  async getFollowUpVisit(
    input: GetFollowUpVisitInput,
  ): Promise<GetFollowUpVisitOutput> {
    const followUpVisit = await this.db.beginTx(
      (ctx) => this.followUpVisitsRepository.getById(ctx, input.id),
      READ_ONLY_DB_TX,
    );

    if (!followUpVisit) {
      throw new NotFoundError(`Follow-up visit '${input.id}' not found`);
    }

    return followUpVisit;
  }
}
