import { GET_QUEUE_USE_CASE, READ_ONLY_DB_TX } from "../../../constants.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  GetQueueInput,
  GetQueueOutput,
  GetQueueUseCase,
} from "../../../domain/ports/in/queues/get-queue.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { QueuesRepository } from "../../../domain/ports/out/database/queues-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type GetQueueServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  queuesRepository: QueuesRepository<TxCtx>;
};

export class GetQueueService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements GetQueueUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly queuesRepository: QueuesRepository<TxCtx>;

  constructor(deps: GetQueueServiceDeps<TxCtx>) {
    super(GET_QUEUE_USE_CASE);

    this.db = deps.db;
    this.queuesRepository = deps.queuesRepository;
  }

  async getQueue(input: GetQueueInput): Promise<GetQueueOutput> {
    const queue = await this.db.beginTx(
      (ctx) => this.queuesRepository.getById(ctx, input.id),
      READ_ONLY_DB_TX,
    );

    if (!queue) {
      throw new NotFoundError(`Queue '${input.id}' not found`);
    }

    return queue;
  }
}
