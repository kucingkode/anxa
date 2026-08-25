import { DELETE_PROCEDURE_REFERENCE_USE_CASE } from "../../../constants.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  DeleteProcedureReferenceInput,
  DeleteProcedureReferenceOutput,
  DeleteProcedureReferenceUseCase,
} from "../../../domain/ports/in/procedure-references/delete-procedure-reference.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ProcedureReferencesRepository } from "../../../domain/ports/out/database/procedure-references-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type DeleteProcedureReferenceServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  procedureReferencesRepository: ProcedureReferencesRepository<TxCtx>;
};

export class DeleteProcedureReferenceService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements DeleteProcedureReferenceUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly procedureReferencesRepository: ProcedureReferencesRepository<TxCtx>;

  constructor(deps: DeleteProcedureReferenceServiceDeps<TxCtx>) {
    super(DELETE_PROCEDURE_REFERENCE_USE_CASE);

    this.db = deps.db;
    this.procedureReferencesRepository = deps.procedureReferencesRepository;
  }

  async deleteProcedureReference(
    input: DeleteProcedureReferenceInput,
  ): Promise<DeleteProcedureReferenceOutput> {
    const removed = await this.db.beginTx((ctx) =>
      this.procedureReferencesRepository.remove(ctx, input.id),
    );

    if (!removed) {
      throw new NotFoundError(`Procedure reference '${input.id}' not found`);
    }

    this.log.info({ procedureReferenceId: input.id }, "Procedure reference deleted");
  }
}