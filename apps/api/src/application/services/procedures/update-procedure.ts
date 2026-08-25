import { UPDATE_PROCEDURE_USE_CASE } from "../../../constants.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  UpdateProcedureInput,
  UpdateProcedureOutput,
  UpdateProcedureUseCase,
} from "../../../domain/ports/in/procedures/update-procedure.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ProceduresRepository } from "../../../domain/ports/out/database/procedures-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type UpdateProcedureServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  proceduresRepository: ProceduresRepository<TxCtx>;
};

export class UpdateProcedureService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements UpdateProcedureUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly proceduresRepository: ProceduresRepository<TxCtx>;

  constructor(deps: UpdateProcedureServiceDeps<TxCtx>) {
    super(UPDATE_PROCEDURE_USE_CASE);

    this.db = deps.db;
    this.proceduresRepository = deps.proceduresRepository;
  }

  async updateProcedure(
    input: UpdateProcedureInput,
  ): Promise<UpdateProcedureOutput> {
    const procedure = await this.db.beginTx((ctx) =>
      this.proceduresRepository.update(ctx, input.id, input.changes),
    );

    if (!procedure) {
      throw new NotFoundError(`Procedure '${input.id}' not found`);
    }

    this.log.info({ procedureId: procedure.id }, "Procedure updated");
    return procedure;
  }
}
