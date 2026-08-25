import { CREATE_QUEUE_USE_CASE, READ_ONLY_DB_TX } from "../../../constants.js";
import { AlreadyExistsError } from "../../../domain/errors/domain/already-exists-error.js";
import type {
  CreateQueueInput,
  CreateQueueOutput,
  CreateQueueUseCase,
} from "../../../domain/ports/in/queues/create-queue.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { QueuesRepository } from "../../../domain/ports/out/database/queues-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type CreateQueueServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  queuesRepository: QueuesRepository<TxCtx>;
};

export class CreateQueueService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements CreateQueueUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly queuesRepository: QueuesRepository<TxCtx>;

  constructor(deps: CreateQueueServiceDeps<TxCtx>) {
    super(CREATE_QUEUE_USE_CASE);

    this.db = deps.db;
    this.queuesRepository = deps.queuesRepository;
  }

  async createQueue(input: CreateQueueInput): Promise<CreateQueueOutput> {
    const active = await this.db.beginTx(
      (ctx) => this.queuesRepository.findActiveByPatientId(ctx, input.patientId),
      READ_ONLY_DB_TX,
    );

    if (active) {
      this.log.warn({ patientId: input.patientId }, "Patient already queued");
      throw new AlreadyExistsError(
        `Patient '${input.patientId}' is already in the queue`,
      );
    }

    const queue = await this.db.beginTx((ctx) =>
      this.queuesRepository.create(ctx, input),
    );

    this.log.info({ queueId: queue.id }, "Queue entry created");
    return queue;
  }
}
