import { GET_CONDITION_USE_CASE, READ_ONLY_DB_TX } from "../../../constants.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  GetConditionInput,
  GetConditionOutput,
  GetConditionUseCase,
} from "../../../domain/ports/in/conditions/get-condition.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ConditionsRepository } from "../../../domain/ports/out/database/conditions-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type GetConditionServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  conditionsRepository: ConditionsRepository<TxCtx>;
};

export class GetConditionService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements GetConditionUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly conditionsRepository: ConditionsRepository<TxCtx>;

  constructor(deps: GetConditionServiceDeps<TxCtx>) {
    super(GET_CONDITION_USE_CASE);

    this.db = deps.db;
    this.conditionsRepository = deps.conditionsRepository;
  }

  async getCondition(input: GetConditionInput): Promise<GetConditionOutput> {
    const condition = await this.db.beginTx(
      (ctx) => this.conditionsRepository.getById(ctx, input.id),
      READ_ONLY_DB_TX,
    );

    if (!condition) {
      throw new NotFoundError(`Condition '${input.id}' not found`);
    }

    return condition;
  }
}
