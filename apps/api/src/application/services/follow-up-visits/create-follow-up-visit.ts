import { CREATE_FOLLOW_UP_VISIT_USE_CASE } from "../../../constants.js";
import type {
  CreateFollowUpVisitInput,
  CreateFollowUpVisitOutput,
  CreateFollowUpVisitUseCase,
} from "../../../domain/ports/in/follow-up-visits/create-follow-up-visit.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { FollowUpVisitsRepository } from "../../../domain/ports/out/database/follow-up-visits-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type CreateFollowUpVisitServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  followUpVisitsRepository: FollowUpVisitsRepository<TxCtx>;
};

export class CreateFollowUpVisitService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements CreateFollowUpVisitUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly followUpVisitsRepository: FollowUpVisitsRepository<TxCtx>;

  constructor(deps: CreateFollowUpVisitServiceDeps<TxCtx>) {
    super(CREATE_FOLLOW_UP_VISIT_USE_CASE);

    this.db = deps.db;
    this.followUpVisitsRepository = deps.followUpVisitsRepository;
  }

  async createFollowUpVisit(
    input: CreateFollowUpVisitInput,
  ): Promise<CreateFollowUpVisitOutput> {
    const followUpVisit = await this.db.beginTx((ctx) =>
      this.followUpVisitsRepository.create(ctx, input),
    );

    this.log.info({ followUpVisitId: followUpVisit.id }, "Follow-up visit created");
    return followUpVisit;
  }
}
