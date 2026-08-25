import { DELETE_QUEUE_USE_CASE } from "../../../constants.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  DeleteQueueInput,
  DeleteQueueOutput,
  DeleteQueueUseCase,
} from "../../../domain/ports/in/queues/delete-queue.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { QueuesRepository } from "../../../domain/ports/out/database/queues-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type DeleteQueueServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  queuesRepository: QueuesRepository<TxCtx>;
};

export class DeleteQueueService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements DeleteQueueUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly queuesRepository: QueuesRepository<TxCtx>;

  constructor(deps: DeleteQueueServiceDeps<TxCtx>) {
    super(DELETE_QUEUE_USE_CASE);

    this.db = deps.db;
    this.queuesRepository = deps.queuesRepository;
  }

  async deleteQueue(input: DeleteQueueInput): Promise<DeleteQueueOutput> {
    const removed = await this.db.beginTx((ctx) =>
      this.queuesRepository.remove(ctx, input.id),
    );

    if (!removed) {
      throw new NotFoundError(`Queue '${input.id}' not found`);
    }

    this.log.info({ queueId: input.id }, "Queue deleted");
  }
}
