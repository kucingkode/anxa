import { LIST_VISITS_USE_CASE, READ_ONLY_DB_TX } from "../../../constants.js";
import type {
  ListVisitsInput,
  ListVisitsOutput,
  ListVisitsUseCase,
} from "../../../domain/ports/in/visits/list-visits.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { VisitsRepository } from "../../../domain/ports/out/database/visits-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type ListVisitsServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  visitsRepository: VisitsRepository<TxCtx>;
};

export class ListVisitsService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements ListVisitsUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly visitsRepository: VisitsRepository<TxCtx>;

  constructor(deps: ListVisitsServiceDeps<TxCtx>) {
    super(LIST_VISITS_USE_CASE);

    this.db = deps.db;
    this.visitsRepository = deps.visitsRepository;
  }

  async listVisits(input: ListVisitsInput): Promise<ListVisitsOutput> {
    return this.db.beginTx(
      (ctx) =>
        this.visitsRepository.list(
          ctx,
          input.limit ?? 20,
          input.patientId,
          input.status,
          input.offset ?? 0,
        ),
      READ_ONLY_DB_TX,
    );
  }
}
