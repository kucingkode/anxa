import { GET_PROCEDURE_USE_CASE, READ_ONLY_DB_TX } from "../../../constants.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  GetProcedureInput,
  GetProcedureOutput,
  GetProcedureUseCase,
} from "../../../domain/ports/in/procedures/get-procedure.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ProceduresRepository } from "../../../domain/ports/out/database/procedures-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type GetProcedureServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  proceduresRepository: ProceduresRepository<TxCtx>;
};

export class GetProcedureService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements GetProcedureUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly proceduresRepository: ProceduresRepository<TxCtx>;

  constructor(deps: GetProcedureServiceDeps<TxCtx>) {
    super(GET_PROCEDURE_USE_CASE);

    this.db = deps.db;
    this.proceduresRepository = deps.proceduresRepository;
  }

  async getProcedure(input: GetProcedureInput): Promise<GetProcedureOutput> {
    const procedure = await this.db.beginTx(
      (ctx) => this.proceduresRepository.getById(ctx, input.id),
      READ_ONLY_DB_TX,
    );

    if (!procedure) {
      throw new NotFoundError(`Procedure '${input.id}' not found`);
    }

    return procedure;
  }
}
