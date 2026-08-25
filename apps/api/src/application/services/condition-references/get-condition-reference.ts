import { GET_CONDITION_REFERENCE_USE_CASE, READ_ONLY_DB_TX } from "../../../constants.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  GetConditionReferenceInput,
  GetConditionReferenceOutput,
  GetConditionReferenceUseCase,
} from "../../../domain/ports/in/condition-references/get-condition-reference.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ConditionReferencesRepository } from "../../../domain/ports/out/database/condition-references-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type GetConditionReferenceServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  conditionReferencesRepository: ConditionReferencesRepository<TxCtx>;
};

export class GetConditionReferenceService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements GetConditionReferenceUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly conditionReferencesRepository: ConditionReferencesRepository<TxCtx>;

  constructor(deps: GetConditionReferenceServiceDeps<TxCtx>) {
    super(GET_CONDITION_REFERENCE_USE_CASE);

    this.db = deps.db;
    this.conditionReferencesRepository = deps.conditionReferencesRepository;
  }

  async getConditionReference(
    input: GetConditionReferenceInput,
  ): Promise<GetConditionReferenceOutput> {
    const conditionReference = await this.db.beginTx(
      (ctx) => this.conditionReferencesRepository.getById(ctx, input.id),
      READ_ONLY_DB_TX,
    );

    if (!conditionReference) {
      throw new NotFoundError(`Condition reference '${input.id}' not found`);
    }

    return conditionReference;
  }
}