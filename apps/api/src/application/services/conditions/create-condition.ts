import { CREATE_CONDITION_USE_CASE } from "../../../constants.js";
import type {
  CreateConditionInput,
  CreateConditionOutput,
  CreateConditionUseCase,
} from "../../../domain/ports/in/conditions/create-condition.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ConditionsRepository } from "../../../domain/ports/out/database/conditions-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type CreateConditionServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  conditionsRepository: ConditionsRepository<TxCtx>;
};

export class CreateConditionService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements CreateConditionUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly conditionsRepository: ConditionsRepository<TxCtx>;

  constructor(deps: CreateConditionServiceDeps<TxCtx>) {
    super(CREATE_CONDITION_USE_CASE);

    this.db = deps.db;
    this.conditionsRepository = deps.conditionsRepository;
  }

  async createCondition(
    input: CreateConditionInput,
  ): Promise<CreateConditionOutput> {
    const condition = await this.db.beginTx((ctx) =>
      this.conditionsRepository.create(ctx, input),
    );

    this.log.info({ conditionId: condition.id }, "Condition created");
    return condition;
  }
}
