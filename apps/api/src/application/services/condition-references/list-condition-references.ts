import { LIST_CONDITION_REFERENCES_USE_CASE, READ_ONLY_DB_TX } from "../../../constants.js";
import type {
  ListConditionReferencesInput,
  ListConditionReferencesOutput,
  ListConditionReferencesUseCase,
} from "../../../domain/ports/in/condition-references/list-condition-references.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ConditionReferencesRepository } from "../../../domain/ports/out/database/condition-references-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type ListConditionReferencesServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  conditionReferencesRepository: ConditionReferencesRepository<TxCtx>;
};

export class ListConditionReferencesService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements ListConditionReferencesUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly conditionReferencesRepository: ConditionReferencesRepository<TxCtx>;

  constructor(deps: ListConditionReferencesServiceDeps<TxCtx>) {
    super(LIST_CONDITION_REFERENCES_USE_CASE);

    this.db = deps.db;
    this.conditionReferencesRepository = deps.conditionReferencesRepository;
  }

  async listConditionReferences(
    input: ListConditionReferencesInput,
  ): Promise<ListConditionReferencesOutput> {
    return this.db.beginTx(
      (ctx) =>
        this.conditionReferencesRepository.list(
          ctx,
          input.limit ?? 20,
          input.query,
          input.offset ?? 0,
        ),
      READ_ONLY_DB_TX,
    );
  }
}