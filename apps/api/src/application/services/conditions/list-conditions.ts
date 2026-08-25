import { LIST_CONDITIONS_USE_CASE, READ_ONLY_DB_TX } from "../../../constants.js";
import type {
  ListConditionsInput,
  ListConditionsOutput,
  ListConditionsUseCase,
} from "../../../domain/ports/in/conditions/list-conditions.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ConditionsRepository } from "../../../domain/ports/out/database/conditions-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type ListConditionsServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  conditionsRepository: ConditionsRepository<TxCtx>;
};

export class ListConditionsService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements ListConditionsUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly conditionsRepository: ConditionsRepository<TxCtx>;

  constructor(deps: ListConditionsServiceDeps<TxCtx>) {
    super(LIST_CONDITIONS_USE_CASE);

    this.db = deps.db;
    this.conditionsRepository = deps.conditionsRepository;
  }

  async listConditions(
    input: ListConditionsInput,
  ): Promise<ListConditionsOutput> {
    return this.db.beginTx(
      (ctx) =>
        this.conditionsRepository.list(
          ctx,
          input.limit ?? 20,
          input.patientId,
          input.visitId,
          input.offset ?? 0,
        ),
      READ_ONLY_DB_TX,
    );
  }
}
