import { GET_OBSERVATION_USE_CASE, READ_ONLY_DB_TX } from "../../../constants.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  GetObservationInput,
  GetObservationOutput,
  GetObservationUseCase,
} from "../../../domain/ports/in/observations/get-observation.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ObservationsRepository } from "../../../domain/ports/out/database/observations-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type GetObservationServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  observationsRepository: ObservationsRepository<TxCtx>;
};

export class GetObservationService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements GetObservationUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly observationsRepository: ObservationsRepository<TxCtx>;

  constructor(deps: GetObservationServiceDeps<TxCtx>) {
    super(GET_OBSERVATION_USE_CASE);

    this.db = deps.db;
    this.observationsRepository = deps.observationsRepository;
  }

  async getObservation(
    input: GetObservationInput,
  ): Promise<GetObservationOutput> {
    const observation = await this.db.beginTx(
      (ctx) => this.observationsRepository.getById(ctx, input.id),
      READ_ONLY_DB_TX,
    );

    if (!observation) {
      throw new NotFoundError(`Observation '${input.id}' not found`);
    }

    return observation;
  }
}
