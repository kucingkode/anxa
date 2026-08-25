import { DELETE_CONDITION_REFERENCE_USE_CASE } from "../../../constants.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  DeleteConditionReferenceInput,
  DeleteConditionReferenceOutput,
  DeleteConditionReferenceUseCase,
} from "../../../domain/ports/in/condition-references/delete-condition-reference.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ConditionReferencesRepository } from "../../../domain/ports/out/database/condition-references-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type DeleteConditionReferenceServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  conditionReferencesRepository: ConditionReferencesRepository<TxCtx>;
};

export class DeleteConditionReferenceService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements DeleteConditionReferenceUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly conditionReferencesRepository: ConditionReferencesRepository<TxCtx>;

  constructor(deps: DeleteConditionReferenceServiceDeps<TxCtx>) {
    super(DELETE_CONDITION_REFERENCE_USE_CASE);

    this.db = deps.db;
    this.conditionReferencesRepository = deps.conditionReferencesRepository;
  }

  async deleteConditionReference(
    input: DeleteConditionReferenceInput,
  ): Promise<DeleteConditionReferenceOutput> {
    const removed = await this.db.beginTx((ctx) =>
      this.conditionReferencesRepository.remove(ctx, input.id),
    );

    if (!removed) {
      throw new NotFoundError(`Condition reference '${input.id}' not found`);
    }

    this.log.info({ conditionReferenceId: input.id }, "Condition reference deleted");
  }
}