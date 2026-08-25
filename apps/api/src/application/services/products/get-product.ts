import { GET_PRODUCT_USE_CASE, READ_ONLY_DB_TX } from "../../../constants.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  GetProductInput,
  GetProductOutput,
  GetProductUseCase,
} from "../../../domain/ports/in/products/get-product.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ProductsRepository } from "../../../domain/ports/out/database/products-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type GetProductServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  productsRepository: ProductsRepository<TxCtx>;
};

export class GetProductService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements GetProductUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly productsRepository: ProductsRepository<TxCtx>;

  constructor(deps: GetProductServiceDeps<TxCtx>) {
    super(GET_PRODUCT_USE_CASE);

    this.db = deps.db;
    this.productsRepository = deps.productsRepository;
  }

  async getProduct(input: GetProductInput): Promise<GetProductOutput> {
    const product = await this.db.beginTx(
      (ctx) => this.productsRepository.getById(ctx, input.id),
      READ_ONLY_DB_TX,
    );

    if (!product) {
      throw new NotFoundError(`Product '${input.id}' not found`);
    }

    return product;
  }
}