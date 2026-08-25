import { UPDATE_CONDITION_REFERENCE_USE_CASE } from "../../../constants.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  UpdateConditionReferenceInput,
  UpdateConditionReferenceOutput,
  UpdateConditionReferenceUseCase,
} from "../../../domain/ports/in/condition-references/update-condition-reference.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ConditionReferencesRepository } from "../../../domain/ports/out/database/condition-references-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type UpdateConditionReferenceServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  conditionReferencesRepository: ConditionReferencesRepository<TxCtx>;
};

export class UpdateConditionReferenceService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements UpdateConditionReferenceUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly conditionReferencesRepository: ConditionReferencesRepository<TxCtx>;

  constructor(deps: UpdateConditionReferenceServiceDeps<TxCtx>) {
    super(UPDATE_CONDITION_REFERENCE_USE_CASE);

    this.db = deps.db;
    this.conditionReferencesRepository = deps.conditionReferencesRepository;
  }

  async updateConditionReference(
    input: UpdateConditionReferenceInput,
  ): Promise<UpdateConditionReferenceOutput> {
    const conditionReference = await this.db.beginTx((ctx) =>
      this.conditionReferencesRepository.update(ctx, input.id, input.changes),
    );

    if (!conditionReference) {
      throw new NotFoundError(`Condition reference '${input.id}' not found`);
    }

    this.log.info({ conditionReferenceId: conditionReference.id }, "Condition reference updated");
    return conditionReference;
  }
}