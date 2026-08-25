import { UPDATE_MANUFACTURER_USE_CASE } from "../../../constants.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  UpdateManufacturerInput,
  UpdateManufacturerOutput,
  UpdateManufacturerUseCase,
} from "../../../domain/ports/in/manufacturers/update-manufacturer.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ManufacturersRepository } from "../../../domain/ports/out/database/manufacturers-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type UpdateManufacturerServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  manufacturersRepository: ManufacturersRepository<TxCtx>;
};

export class UpdateManufacturerService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements UpdateManufacturerUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly manufacturersRepository: ManufacturersRepository<TxCtx>;

  constructor(deps: UpdateManufacturerServiceDeps<TxCtx>) {
    super(UPDATE_MANUFACTURER_USE_CASE);

    this.db = deps.db;
    this.manufacturersRepository = deps.manufacturersRepository;
  }

  async updateManufacturer(
    input: UpdateManufacturerInput,
  ): Promise<UpdateManufacturerOutput> {
    const manufacturer = await this.db.beginTx((ctx) =>
      this.manufacturersRepository.update(ctx, input.id, input.changes),
    );

    if (!manufacturer) {
      throw new NotFoundError(`Manufacturer '${input.id}' not found`);
    }

    this.log.info(
      { manufacturerId: manufacturer.id },
      "Manufacturer updated",
    );
    return manufacturer;
  }
}