import { LIST_PROCEDURE_REFERENCES_USE_CASE, READ_ONLY_DB_TX } from "../../../constants.js";
import type {
  ListProcedureReferencesInput,
  ListProcedureReferencesOutput,
  ListProcedureReferencesUseCase,
} from "../../../domain/ports/in/procedure-references/list-procedure-references.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ProcedureReferencesRepository } from "../../../domain/ports/out/database/procedure-references-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type ListProcedureReferencesServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  procedureReferencesRepository: ProcedureReferencesRepository<TxCtx>;
};

export class ListProcedureReferencesService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements ListProcedureReferencesUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly procedureReferencesRepository: ProcedureReferencesRepository<TxCtx>;

  constructor(deps: ListProcedureReferencesServiceDeps<TxCtx>) {
    super(LIST_PROCEDURE_REFERENCES_USE_CASE);

    this.db = deps.db;
    this.procedureReferencesRepository = deps.procedureReferencesRepository;
  }

  async listProcedureReferences(
    input: ListProcedureReferencesInput,
  ): Promise<ListProcedureReferencesOutput> {
    return this.db.beginTx(
      (ctx) =>
        this.procedureReferencesRepository.list(
          ctx,
          input.limit ?? 20,
          input.query,
          input.offset ?? 0,
        ),
      READ_ONLY_DB_TX,
    );
  }
}