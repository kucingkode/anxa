import { UPDATE_PROCEDURE_REFERENCE_USE_CASE } from "../../../constants.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  UpdateProcedureReferenceInput,
  UpdateProcedureReferenceOutput,
  UpdateProcedureReferenceUseCase,
} from "../../../domain/ports/in/procedure-references/update-procedure-reference.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ProcedureReferencesRepository } from "../../../domain/ports/out/database/procedure-references-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type UpdateProcedureReferenceServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  procedureReferencesRepository: ProcedureReferencesRepository<TxCtx>;
};

export class UpdateProcedureReferenceService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements UpdateProcedureReferenceUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly procedureReferencesRepository: ProcedureReferencesRepository<TxCtx>;

  constructor(deps: UpdateProcedureReferenceServiceDeps<TxCtx>) {
    super(UPDATE_PROCEDURE_REFERENCE_USE_CASE);

    this.db = deps.db;
    this.procedureReferencesRepository = deps.procedureReferencesRepository;
  }

  async updateProcedureReference(
    input: UpdateProcedureReferenceInput,
  ): Promise<UpdateProcedureReferenceOutput> {
    const procedureReference = await this.db.beginTx((ctx) =>
      this.procedureReferencesRepository.update(ctx, input.id, input.changes),
    );

    if (!procedureReference) {
      throw new NotFoundError(`Procedure reference '${input.id}' not found`);
    }

    this.log.info({ procedureReferenceId: procedureReference.id }, "Procedure reference updated");
    return procedureReference;
  }
}