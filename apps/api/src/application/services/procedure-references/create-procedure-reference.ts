import { CREATE_PROCEDURE_REFERENCE_USE_CASE } from "../../../constants.js";
import type {
  CreateProcedureReferenceInput,
  CreateProcedureReferenceOutput,
  CreateProcedureReferenceUseCase,
} from "../../../domain/ports/in/procedure-references/create-procedure-reference.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ProcedureReferencesRepository } from "../../../domain/ports/out/database/procedure-references-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type CreateProcedureReferenceServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  procedureReferencesRepository: ProcedureReferencesRepository<TxCtx>;
};

export class CreateProcedureReferenceService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements CreateProcedureReferenceUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly procedureReferencesRepository: ProcedureReferencesRepository<TxCtx>;

  constructor(deps: CreateProcedureReferenceServiceDeps<TxCtx>) {
    super(CREATE_PROCEDURE_REFERENCE_USE_CASE);

    this.db = deps.db;
    this.procedureReferencesRepository = deps.procedureReferencesRepository;
  }

  async createProcedureReference(
    input: CreateProcedureReferenceInput,
  ): Promise<CreateProcedureReferenceOutput> {
    const procedureReference = await this.db.beginTx((ctx) =>
      this.procedureReferencesRepository.create(ctx, input),
    );

    this.log.info({ procedureReferenceId: procedureReference.id }, "Procedure reference created");
    return procedureReference;
  }
}