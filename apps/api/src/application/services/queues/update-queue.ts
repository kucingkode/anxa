import { UPDATE_QUEUE_USE_CASE } from "../../../constants.js";
import { InvalidStateTransitionError } from "../../../domain/errors/domain/invalid-state-transition-error.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import { PreconditionFailedError } from "../../../domain/errors/domain/precondition-failed-error.js";
import type {
  UpdateQueueInput,
  UpdateQueueOutput,
  UpdateQueueUseCase,
} from "../../../domain/ports/in/queues/update-queue.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { QueuesRepository } from "../../../domain/ports/out/database/queues-repository.js";
import type { VisitsRepository } from "../../../domain/ports/out/database/visits-repository.js";
import { canTransition } from "../../../domain/queues/state-machine.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

const DEFAULT_VISIT_CLASS = "AMB";

export type UpdateQueueServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  queuesRepository: QueuesRepository<TxCtx>;
  visitsRepository: VisitsRepository<TxCtx>;
};

export class UpdateQueueService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements UpdateQueueUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly queuesRepository: QueuesRepository<TxCtx>;
  private readonly visitsRepository: VisitsRepository<TxCtx>;

  constructor(deps: UpdateQueueServiceDeps<TxCtx>) {
    super(UPDATE_QUEUE_USE_CASE);

    this.db = deps.db;
    this.queuesRepository = deps.queuesRepository;
    this.visitsRepository = deps.visitsRepository;
  }

  async updateQueue(input: UpdateQueueInput): Promise<UpdateQueueOutput> {
    const updated = await this.db.beginTx(async (ctx) => {
      const queue = await this.queuesRepository.getById(ctx, input.id);
      if (!queue) {
        throw new NotFoundError(`Queue '${input.id}' not found`);
      }

      if (!canTransition(queue.status, input.status)) {
        throw new InvalidStateTransitionError(
          `Cannot transition queue from '${queue.status}' to '${input.status}'`,
        );
      }

      let visitId = queue.visitId;

      if (input.status === "in-service" && !visitId) {
        const visit = await this.visitsRepository.create(ctx, {
          patientId: queue.patientId,
          status: "arrived",
          class: DEFAULT_VISIT_CLASS,
        });
        visitId = visit.id;
      } else if (visitId && input.status === "done") {
        await this.visitsRepository.updateStatus(ctx, visitId, "finished");
      } else if (visitId && input.status === "cancelled") {
        await this.visitsRepository.updateStatus(ctx, visitId, "cancelled");
      }

      const result = await this.queuesRepository.update(
        ctx,
        input.id,
        input.status,
        input.expectedVersion,
        visitId,
      );

      if (!result) {
        throw new PreconditionFailedError();
      }

      return result;
    });

    this.log.info(
      { queueId: updated.id, status: updated.status },
      "Queue updated",
    );
    return updated;
  }
}
