import { DELETE_CONDITION_USE_CASE } from "../../../constants.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  DeleteConditionInput,
  DeleteConditionOutput,
  DeleteConditionUseCase,
} from "../../../domain/ports/in/conditions/delete-condition.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ConditionsRepository } from "../../../domain/ports/out/database/conditions-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type DeleteConditionServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  conditionsRepository: ConditionsRepository<TxCtx>;
};

export class DeleteConditionService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements DeleteConditionUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly conditionsRepository: ConditionsRepository<TxCtx>;

  constructor(deps: DeleteConditionServiceDeps<TxCtx>) {
    super(DELETE_CONDITION_USE_CASE);

    this.db = deps.db;
    this.conditionsRepository = deps.conditionsRepository;
  }

  async deleteCondition(
    input: DeleteConditionInput,
  ): Promise<DeleteConditionOutput> {
    const removed = await this.db.beginTx((ctx) =>
      this.conditionsRepository.remove(ctx, input.id),
    );

    if (!removed) {
      throw new NotFoundError(`Condition '${input.id}' not found`);
    }

    this.log.info({ conditionId: input.id }, "Condition deleted");
  }
}
