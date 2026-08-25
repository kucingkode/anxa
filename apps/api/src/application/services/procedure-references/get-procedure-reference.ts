import { GET_PROCEDURE_REFERENCE_USE_CASE, READ_ONLY_DB_TX } from "../../../constants.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  GetProcedureReferenceInput,
  GetProcedureReferenceOutput,
  GetProcedureReferenceUseCase,
} from "../../../domain/ports/in/procedure-references/get-procedure-reference.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ProcedureReferencesRepository } from "../../../domain/ports/out/database/procedure-references-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type GetProcedureReferenceServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  procedureReferencesRepository: ProcedureReferencesRepository<TxCtx>;
};

export class GetProcedureReferenceService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements GetProcedureReferenceUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly procedureReferencesRepository: ProcedureReferencesRepository<TxCtx>;

  constructor(deps: GetProcedureReferenceServiceDeps<TxCtx>) {
    super(GET_PROCEDURE_REFERENCE_USE_CASE);

    this.db = deps.db;
    this.procedureReferencesRepository = deps.procedureReferencesRepository;
  }

  async getProcedureReference(
    input: GetProcedureReferenceInput,
  ): Promise<GetProcedureReferenceOutput> {
    const procedureReference = await this.db.beginTx(
      (ctx) => this.procedureReferencesRepository.getById(ctx, input.id),
      READ_ONLY_DB_TX,
    );

    if (!procedureReference) {
      throw new NotFoundError(`Procedure reference '${input.id}' not found`);
    }

    return procedureReference;
  }
}