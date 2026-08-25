import { LIST_PROCEDURES_USE_CASE, READ_ONLY_DB_TX } from "../../../constants.js";
import type {
  ListProceduresInput,
  ListProceduresOutput,
  ListProceduresUseCase,
} from "../../../domain/ports/in/procedures/list-procedures.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ProceduresRepository } from "../../../domain/ports/out/database/procedures-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type ListProceduresServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  proceduresRepository: ProceduresRepository<TxCtx>;
};

export class ListProceduresService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements ListProceduresUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly proceduresRepository: ProceduresRepository<TxCtx>;

  constructor(deps: ListProceduresServiceDeps<TxCtx>) {
    super(LIST_PROCEDURES_USE_CASE);

    this.db = deps.db;
    this.proceduresRepository = deps.proceduresRepository;
  }

  async listProcedures(
    input: ListProceduresInput,
  ): Promise<ListProceduresOutput> {
    return this.db.beginTx(
      (ctx) =>
        this.proceduresRepository.list(
          ctx,
          input.limit ?? 20,
          input.patientId,
          input.visitId,
          input.offset ?? 0,
        ),
      READ_ONLY_DB_TX,
    );
  }
}
