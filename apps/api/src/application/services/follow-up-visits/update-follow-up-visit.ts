import { UPDATE_FOLLOW_UP_VISIT_USE_CASE } from "../../../constants.js";
import { InvalidStateTransitionError } from "../../../domain/errors/domain/invalid-state-transition-error.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  UpdateFollowUpVisitInput,
  UpdateFollowUpVisitOutput,
  UpdateFollowUpVisitUseCase,
} from "../../../domain/ports/in/follow-up-visits/update-follow-up-visit.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { FollowUpVisitsRepository } from "../../../domain/ports/out/database/follow-up-visits-repository.js";
import { canTransition } from "../../../domain/follow-up-visits/state-machine.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type UpdateFollowUpVisitServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  followUpVisitsRepository: FollowUpVisitsRepository<TxCtx>;
};

export class UpdateFollowUpVisitService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements UpdateFollowUpVisitUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly followUpVisitsRepository: FollowUpVisitsRepository<TxCtx>;

  constructor(deps: UpdateFollowUpVisitServiceDeps<TxCtx>) {
    super(UPDATE_FOLLOW_UP_VISIT_USE_CASE);

    this.db = deps.db;
    this.followUpVisitsRepository = deps.followUpVisitsRepository;
  }

  async updateFollowUpVisit(
    input: UpdateFollowUpVisitInput,
  ): Promise<UpdateFollowUpVisitOutput> {
    const updated = await this.db.beginTx(async (ctx) => {
      const existing = await this.followUpVisitsRepository.getById(ctx, input.id);
      if (!existing) {
        throw new NotFoundError(`Follow-up visit '${input.id}' not found`);
      }

      if (
        input.changes.status &&
        !canTransition(existing.status, input.changes.status)
      ) {
        throw new InvalidStateTransitionError(
          `Cannot transition follow-up visit from '${existing.status}' to '${input.changes.status}'`,
        );
      }

      const result = await this.followUpVisitsRepository.update(
        ctx,
        input.id,
        input.changes,
      );

      if (!result) {
        throw new NotFoundError(`Follow-up visit '${input.id}' not found`);
      }

      return result;
    });

    this.log.info({ followUpVisitId: updated.id }, "Follow-up visit updated");
    return updated;
  }
}
