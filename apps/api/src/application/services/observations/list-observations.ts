import { LIST_OBSERVATIONS_USE_CASE, READ_ONLY_DB_TX } from "../../../constants.js";
import type {
  ListObservationsInput,
  ListObservationsOutput,
  ListObservationsUseCase,
} from "../../../domain/ports/in/observations/list-observations.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ObservationsRepository } from "../../../domain/ports/out/database/observations-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type ListObservationsServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  observationsRepository: ObservationsRepository<TxCtx>;
};

export class ListObservationsService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements ListObservationsUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly observationsRepository: ObservationsRepository<TxCtx>;

  constructor(deps: ListObservationsServiceDeps<TxCtx>) {
    super(LIST_OBSERVATIONS_USE_CASE);

    this.db = deps.db;
    this.observationsRepository = deps.observationsRepository;
  }

  async listObservations(
    input: ListObservationsInput,
  ): Promise<ListObservationsOutput> {
    return this.db.beginTx(
      (ctx) =>
        this.observationsRepository.list(
          ctx,
          input.limit ?? 20,
          input.patientId,
          input.visitId,
          input.status,
          input.offset ?? 0,
        ),
      READ_ONLY_DB_TX,
    );
  }
}
