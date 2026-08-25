import { LIST_QUEUES_USE_CASE, READ_ONLY_DB_TX } from "../../../constants.js";
import type {
  ListQueuesInput,
  ListQueuesOutput,
  ListQueuesUseCase,
} from "../../../domain/ports/in/queues/list-queues.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { QueuesRepository } from "../../../domain/ports/out/database/queues-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type ListQueuesServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  queuesRepository: QueuesRepository<TxCtx>;
};

export class ListQueuesService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements ListQueuesUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly queuesRepository: QueuesRepository<TxCtx>;

  constructor(deps: ListQueuesServiceDeps<TxCtx>) {
    super(LIST_QUEUES_USE_CASE);

    this.db = deps.db;
    this.queuesRepository = deps.queuesRepository;
  }

  async listQueues(input: ListQueuesInput): Promise<ListQueuesOutput> {
    return this.db.beginTx(
      (ctx) =>
        this.queuesRepository.list(
          ctx,
          input.limit ?? 20,
          input.patientId,
          input.status,
          input.offset ?? 0,
        ),
      READ_ONLY_DB_TX,
    );
  }
}
