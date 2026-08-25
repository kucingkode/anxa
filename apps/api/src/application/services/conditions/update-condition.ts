import { UPDATE_CONDITION_USE_CASE } from "../../../constants.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  UpdateConditionInput,
  UpdateConditionOutput,
  UpdateConditionUseCase,
} from "../../../domain/ports/in/conditions/update-condition.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ConditionsRepository } from "../../../domain/ports/out/database/conditions-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type UpdateConditionServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  conditionsRepository: ConditionsRepository<TxCtx>;
};

export class UpdateConditionService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements UpdateConditionUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly conditionsRepository: ConditionsRepository<TxCtx>;

  constructor(deps: UpdateConditionServiceDeps<TxCtx>) {
    super(UPDATE_CONDITION_USE_CASE);

    this.db = deps.db;
    this.conditionsRepository = deps.conditionsRepository;
  }

  async updateCondition(
    input: UpdateConditionInput,
  ): Promise<UpdateConditionOutput> {
    const condition = await this.db.beginTx((ctx) =>
      this.conditionsRepository.update(ctx, input.id, input.changes),
    );

    if (!condition) {
      throw new NotFoundError(`Condition '${input.id}' not found`);
    }

    this.log.info({ conditionId: condition.id }, "Condition updated");
    return condition;
  }
}
