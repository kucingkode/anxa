import { UPDATE_PRODUCT_USE_CASE } from "../../../constants.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  UpdateProductInput,
  UpdateProductOutput,
  UpdateProductUseCase,
} from "../../../domain/ports/in/products/update-product.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ProductsRepository } from "../../../domain/ports/out/database/products-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type UpdateProductServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  productsRepository: ProductsRepository<TxCtx>;
};

export class UpdateProductService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements UpdateProductUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly productsRepository: ProductsRepository<TxCtx>;

  constructor(deps: UpdateProductServiceDeps<TxCtx>) {
    super(UPDATE_PRODUCT_USE_CASE);

    this.db = deps.db;
    this.productsRepository = deps.productsRepository;
  }

  async updateProduct(
    input: UpdateProductInput,
  ): Promise<UpdateProductOutput> {
    const product = await this.db.beginTx((ctx) =>
      this.productsRepository.update(ctx, input.id, input.changes),
    );

    if (!product) {
      throw new NotFoundError(`Product '${input.id}' not found`);
    }

    this.log.info({ productId: product.id }, "Product updated");
    return product;
  }
}