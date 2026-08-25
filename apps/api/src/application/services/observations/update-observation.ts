import { UPDATE_OBSERVATION_USE_CASE } from "../../../constants.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import { PreconditionFailedError } from "../../../domain/errors/domain/precondition-failed-error.js";
import type {
  UpdateObservationInput,
  UpdateObservationOutput,
  UpdateObservationUseCase,
} from "../../../domain/ports/in/observations/update-observation.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ObservationsRepository } from "../../../domain/ports/out/database/observations-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type UpdateObservationServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  observationsRepository: ObservationsRepository<TxCtx>;
};

export class UpdateObservationService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements UpdateObservationUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly observationsRepository: ObservationsRepository<TxCtx>;

  constructor(deps: UpdateObservationServiceDeps<TxCtx>) {
    super(UPDATE_OBSERVATION_USE_CASE);

    this.db = deps.db;
    this.observationsRepository = deps.observationsRepository;
  }

  async updateObservation(
    input: UpdateObservationInput,
  ): Promise<UpdateObservationOutput> {
    const updated = await this.db.beginTx(async (ctx) => {
      const existing = await this.observationsRepository.getById(ctx, input.id);
      if (!existing) {
        throw new NotFoundError(`Observation '${input.id}' not found`);
      }

      const result = await this.observationsRepository.update(
        ctx,
        input.id,
        input.changes,
        input.expectedVersion,
      );

      if (!result) {
        throw new PreconditionFailedError();
      }

      return result;
    });

    this.log.info({ observationId: updated.id }, "Observation updated");
    return updated;
  }
}
