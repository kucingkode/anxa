import { DELETE_MANUFACTURER_USE_CASE } from "../../../constants.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  DeleteManufacturerInput,
  DeleteManufacturerOutput,
  DeleteManufacturerUseCase,
} from "../../../domain/ports/in/manufacturers/delete-manufacturer.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ManufacturersRepository } from "../../../domain/ports/out/database/manufacturers-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type DeleteManufacturerServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  manufacturersRepository: ManufacturersRepository<TxCtx>;
};

export class DeleteManufacturerService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements DeleteManufacturerUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly manufacturersRepository: ManufacturersRepository<TxCtx>;

  constructor(deps: DeleteManufacturerServiceDeps<TxCtx>) {
    super(DELETE_MANUFACTURER_USE_CASE);

    this.db = deps.db;
    this.manufacturersRepository = deps.manufacturersRepository;
  }

  async deleteManufacturer(
    input: DeleteManufacturerInput,
  ): Promise<DeleteManufacturerOutput> {
    const removed = await this.db.beginTx((ctx) =>
      this.manufacturersRepository.remove(ctx, input.id),
    );

    if (!removed) {
      throw new NotFoundError(`Manufacturer '${input.id}' not found`);
    }

    this.log.info({ manufacturerId: input.id }, "Manufacturer deleted");
  }
}