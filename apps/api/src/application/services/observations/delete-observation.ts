import { DELETE_OBSERVATION_USE_CASE } from "../../../constants.js";
import { ConflictError } from "../../../domain/errors/domain/conflict-error.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  DeleteObservationInput,
  DeleteObservationOutput,
  DeleteObservationUseCase,
} from "../../../domain/ports/in/observations/delete-observation.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ObservationsRepository } from "../../../domain/ports/out/database/observations-repository.js";
import { isTerminal } from "../../../domain/observations/state-machine.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type DeleteObservationServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  observationsRepository: ObservationsRepository<TxCtx>;
};

export class DeleteObservationService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements DeleteObservationUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly observationsRepository: ObservationsRepository<TxCtx>;

  constructor(deps: DeleteObservationServiceDeps<TxCtx>) {
    super(DELETE_OBSERVATION_USE_CASE);

    this.db = deps.db;
    this.observationsRepository = deps.observationsRepository;
  }

  async deleteObservation(
    input: DeleteObservationInput,
  ): Promise<DeleteObservationOutput> {
    await this.db.beginTx(async (ctx) => {
      const existing = await this.observationsRepository.getById(ctx, input.id);
      if (!existing) {
        throw new NotFoundError(`Observation '${input.id}' not found`);
      }

      if (isTerminal(existing.status)) {
        throw new ConflictError(
          `Observation '${input.id}' is already in a terminal state`,
        );
      }

      await this.observationsRepository.markEnteredInError(ctx, input.id);
    });

    this.log.info({ observationId: input.id }, "Observation soft-deleted");
  }
}
