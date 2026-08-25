import { LIST_PRODUCTS_USE_CASE, READ_ONLY_DB_TX } from "../../../constants.js";
import type {
  ListProductsInput,
  ListProductsOutput,
  ListProductsUseCase,
} from "../../../domain/ports/in/products/list-products.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ProductsRepository } from "../../../domain/ports/out/database/products-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type ListProductsServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  productsRepository: ProductsRepository<TxCtx>;
};

export class ListProductsService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements ListProductsUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly productsRepository: ProductsRepository<TxCtx>;

  constructor(deps: ListProductsServiceDeps<TxCtx>) {
    super(LIST_PRODUCTS_USE_CASE);

    this.db = deps.db;
    this.productsRepository = deps.productsRepository;
  }

  async listProducts(input: ListProductsInput): Promise<ListProductsOutput> {
    return this.db.beginTx(
      (ctx) =>
        this.productsRepository.list(
          ctx,
          input.limit ?? 20,
          input.query,
          input.manufacturerId,
          input.offset ?? 0,
        ),
      READ_ONLY_DB_TX,
    );
  }
}