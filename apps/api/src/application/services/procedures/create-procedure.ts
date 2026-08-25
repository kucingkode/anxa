import { CREATE_PROCEDURE_USE_CASE } from "../../../constants.js";
import type {
  CreateProcedureInput,
  CreateProcedureOutput,
  CreateProcedureUseCase,
} from "../../../domain/ports/in/procedures/create-procedure.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ProceduresRepository } from "../../../domain/ports/out/database/procedures-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type CreateProcedureServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  proceduresRepository: ProceduresRepository<TxCtx>;
};

export class CreateProcedureService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements CreateProcedureUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly proceduresRepository: ProceduresRepository<TxCtx>;

  constructor(deps: CreateProcedureServiceDeps<TxCtx>) {
    super(CREATE_PROCEDURE_USE_CASE);

    this.db = deps.db;
    this.proceduresRepository = deps.proceduresRepository;
  }

  async createProcedure(
    input: CreateProcedureInput,
  ): Promise<CreateProcedureOutput> {
    const procedure = await this.db.beginTx((ctx) =>
      this.proceduresRepository.create(ctx, input),
    );

    this.log.info({ procedureId: procedure.id }, "Procedure created");
    return procedure;
  }
}
