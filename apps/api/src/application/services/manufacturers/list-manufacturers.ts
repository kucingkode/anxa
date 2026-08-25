import { LIST_MANUFACTURERS_USE_CASE, READ_ONLY_DB_TX } from "../../../constants.js";
import type {
  ListManufacturersInput,
  ListManufacturersOutput,
  ListManufacturersUseCase,
} from "../../../domain/ports/in/manufacturers/list-manufacturers.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ManufacturersRepository } from "../../../domain/ports/out/database/manufacturers-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type ListManufacturersServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  manufacturersRepository: ManufacturersRepository<TxCtx>;
};

export class ListManufacturersService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements ListManufacturersUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly manufacturersRepository: ManufacturersRepository<TxCtx>;

  constructor(deps: ListManufacturersServiceDeps<TxCtx>) {
    super(LIST_MANUFACTURERS_USE_CASE);

    this.db = deps.db;
    this.manufacturersRepository = deps.manufacturersRepository;
  }

  async listManufacturers(
    input: ListManufacturersInput,
  ): Promise<ListManufacturersOutput> {
    return this.db.beginTx(
      (ctx) =>
        this.manufacturersRepository.list(
          ctx,
          input.limit ?? 20,
          input.query,
          input.offset ?? 0,
        ),
      READ_ONLY_DB_TX,
    );
  }
}