import { GET_MANUFACTURER_USE_CASE, READ_ONLY_DB_TX } from "../../../constants.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  GetManufacturerInput,
  GetManufacturerOutput,
  GetManufacturerUseCase,
} from "../../../domain/ports/in/manufacturers/get-manufacturer.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ManufacturersRepository } from "../../../domain/ports/out/database/manufacturers-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type GetManufacturerServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  manufacturersRepository: ManufacturersRepository<TxCtx>;
};

export class GetManufacturerService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements GetManufacturerUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly manufacturersRepository: ManufacturersRepository<TxCtx>;

  constructor(deps: GetManufacturerServiceDeps<TxCtx>) {
    super(GET_MANUFACTURER_USE_CASE);

    this.db = deps.db;
    this.manufacturersRepository = deps.manufacturersRepository;
  }

  async getManufacturer(
    input: GetManufacturerInput,
  ): Promise<GetManufacturerOutput> {
    const manufacturer = await this.db.beginTx(
      (ctx) => this.manufacturersRepository.getById(ctx, input.id),
      READ_ONLY_DB_TX,
    );

    if (!manufacturer) {
      throw new NotFoundError(`Manufacturer '${input.id}' not found`);
    }

    return manufacturer;
  }
}