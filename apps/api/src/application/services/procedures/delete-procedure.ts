import { DELETE_PROCEDURE_USE_CASE } from "../../../constants.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  DeleteProcedureInput,
  DeleteProcedureOutput,
  DeleteProcedureUseCase,
} from "../../../domain/ports/in/procedures/delete-procedure.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ProceduresRepository } from "../../../domain/ports/out/database/procedures-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type DeleteProcedureServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  proceduresRepository: ProceduresRepository<TxCtx>;
};

export class DeleteProcedureService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements DeleteProcedureUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly proceduresRepository: ProceduresRepository<TxCtx>;

  constructor(deps: DeleteProcedureServiceDeps<TxCtx>) {
    super(DELETE_PROCEDURE_USE_CASE);

    this.db = deps.db;
    this.proceduresRepository = deps.proceduresRepository;
  }

  async deleteProcedure(
    input: DeleteProcedureInput,
  ): Promise<DeleteProcedureOutput> {
    const removed = await this.db.beginTx((ctx) =>
      this.proceduresRepository.remove(ctx, input.id),
    );

    if (!removed) {
      throw new NotFoundError(`Procedure '${input.id}' not found`);
    }

    this.log.info({ procedureId: input.id }, "Procedure deleted");
  }
}
