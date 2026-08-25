import { CREATE_MANUFACTURER_USE_CASE } from "../../../constants.js";
import type {
  CreateManufacturerInput,
  CreateManufacturerOutput,
  CreateManufacturerUseCase,
} from "../../../domain/ports/in/manufacturers/create-manufacturer.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ManufacturersRepository } from "../../../domain/ports/out/database/manufacturers-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type CreateManufacturerServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  manufacturersRepository: ManufacturersRepository<TxCtx>;
};

export class CreateManufacturerService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements CreateManufacturerUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly manufacturersRepository: ManufacturersRepository<TxCtx>;

  constructor(deps: CreateManufacturerServiceDeps<TxCtx>) {
    super(CREATE_MANUFACTURER_USE_CASE);

    this.db = deps.db;
    this.manufacturersRepository = deps.manufacturersRepository;
  }

  async createManufacturer(
    input: CreateManufacturerInput,
  ): Promise<CreateManufacturerOutput> {
    const manufacturer = await this.db.beginTx((ctx) =>
      this.manufacturersRepository.create(ctx, input),
    );

    this.log.info(
      { manufacturerId: manufacturer.id },
      "Manufacturer created",
    );
    return manufacturer;
  }
}