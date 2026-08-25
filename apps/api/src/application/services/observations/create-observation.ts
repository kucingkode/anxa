import { CREATE_OBSERVATION_USE_CASE } from "../../../constants.js";
import type {
  CreateObservationInput,
  CreateObservationOutput,
  CreateObservationUseCase,
} from "../../../domain/ports/in/observations/create-observation.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ObservationsRepository } from "../../../domain/ports/out/database/observations-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type CreateObservationServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  observationsRepository: ObservationsRepository<TxCtx>;
};

export class CreateObservationService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements CreateObservationUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly observationsRepository: ObservationsRepository<TxCtx>;

  constructor(deps: CreateObservationServiceDeps<TxCtx>) {
    super(CREATE_OBSERVATION_USE_CASE);

    this.db = deps.db;
    this.observationsRepository = deps.observationsRepository;
  }

  async createObservation(
    input: CreateObservationInput,
  ): Promise<CreateObservationOutput> {
    const observation = await this.db.beginTx((ctx) =>
      this.observationsRepository.create(ctx, input),
    );

    this.log.info({ observationId: observation.id }, "Observation created");
    return observation;
  }
}
