import { CREATE_CONDITION_REFERENCE_USE_CASE } from "../../../constants.js";
import type {
  CreateConditionReferenceInput,
  CreateConditionReferenceOutput,
  CreateConditionReferenceUseCase,
} from "../../../domain/ports/in/condition-references/create-condition-reference.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ConditionReferencesRepository } from "../../../domain/ports/out/database/condition-references-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type CreateConditionReferenceServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  conditionReferencesRepository: ConditionReferencesRepository<TxCtx>;
};

export class CreateConditionReferenceService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements CreateConditionReferenceUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly conditionReferencesRepository: ConditionReferencesRepository<TxCtx>;

  constructor(deps: CreateConditionReferenceServiceDeps<TxCtx>) {
    super(CREATE_CONDITION_REFERENCE_USE_CASE);

    this.db = deps.db;
    this.conditionReferencesRepository = deps.conditionReferencesRepository;
  }

  async createConditionReference(
    input: CreateConditionReferenceInput,
  ): Promise<CreateConditionReferenceOutput> {
    const conditionReference = await this.db.beginTx((ctx) =>
      this.conditionReferencesRepository.create(ctx, input),
    );

    this.log.info({ conditionReferenceId: conditionReference.id }, "Condition reference created");
    return conditionReference;
  }
}