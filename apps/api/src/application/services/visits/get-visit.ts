import { GET_VISIT_USE_CASE, READ_ONLY_DB_TX } from "../../../constants.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  GetVisitInput,
  GetVisitOutput,
  GetVisitUseCase,
} from "../../../domain/ports/in/visits/get-visit.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { VisitsRepository } from "../../../domain/ports/out/database/visits-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type GetVisitServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  visitsRepository: VisitsRepository<TxCtx>;
};

export class GetVisitService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements GetVisitUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly visitsRepository: VisitsRepository<TxCtx>;

  constructor(deps: GetVisitServiceDeps<TxCtx>) {
    super(GET_VISIT_USE_CASE);

    this.db = deps.db;
    this.visitsRepository = deps.visitsRepository;
  }

  async getVisit(input: GetVisitInput): Promise<GetVisitOutput> {
    const visit = await this.db.beginTx(
      (ctx) => this.visitsRepository.getById(ctx, input.id),
      READ_ONLY_DB_TX,
    );

    if (!visit) {
      throw new NotFoundError(`Visit '${input.id}' not found`);
    }

    return visit;
  }
}
