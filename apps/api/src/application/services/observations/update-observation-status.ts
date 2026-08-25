import { UPDATE_OBSERVATION_STATUS_USE_CASE } from "../../../constants.js";
import { InvalidStateTransitionError } from "../../../domain/errors/domain/invalid-state-transition-error.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import { PreconditionFailedError } from "../../../domain/errors/domain/precondition-failed-error.js";
import type {
  UpdateObservationStatusInput,
  UpdateObservationStatusOutput,
  UpdateObservationStatusUseCase,
} from "../../../domain/ports/in/observations/update-observation-status.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ObservationsRepository } from "../../../domain/ports/out/database/observations-repository.js";
import { canTransition } from "../../../domain/observations/state-machine.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type UpdateObservationStatusServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  observationsRepository: ObservationsRepository<TxCtx>;
};

export class UpdateObservationStatusService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements UpdateObservationStatusUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly observationsRepository: ObservationsRepository<TxCtx>;

  constructor(deps: UpdateObservationStatusServiceDeps<TxCtx>) {
    super(UPDATE_OBSERVATION_STATUS_USE_CASE);

    this.db = deps.db;
    this.observationsRepository = deps.observationsRepository;
  }

  async updateObservationStatus(
    input: UpdateObservationStatusInput,
  ): Promise<UpdateObservationStatusOutput> {
    const updated = await this.db.beginTx(async (ctx) => {
      const existing = await this.observationsRepository.getById(ctx, input.id);
      if (!existing) {
        throw new NotFoundError(`Observation '${input.id}' not found`);
      }

      if (!canTransition(existing.status, input.status)) {
        throw new InvalidStateTransitionError(
          `Cannot transition observation from '${existing.status}' to '${input.status}'`,
        );
      }

      const result = await this.observationsRepository.updateStatus(
        ctx,
        input.id,
        input.status,
        input.expectedVersion,
      );

      if (!result) {
        throw new PreconditionFailedError();
      }

      return result;
    });

    this.log.info(
      { observationId: updated.id, status: updated.status },
      "Observation status updated",
    );
    return updated;
  }
}
