import { DELETE_PRODUCT_USE_CASE } from "../../../constants.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  DeleteProductInput,
  DeleteProductOutput,
  DeleteProductUseCase,
} from "../../../domain/ports/in/products/delete-product.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ProductsRepository } from "../../../domain/ports/out/database/products-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type DeleteProductServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  productsRepository: ProductsRepository<TxCtx>;
};

export class DeleteProductService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements DeleteProductUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly productsRepository: ProductsRepository<TxCtx>;

  constructor(deps: DeleteProductServiceDeps<TxCtx>) {
    super(DELETE_PRODUCT_USE_CASE);

    this.db = deps.db;
    this.productsRepository = deps.productsRepository;
  }

  async deleteProduct(
    input: DeleteProductInput,
  ): Promise<DeleteProductOutput> {
    const removed = await this.db.beginTx((ctx) =>
      this.productsRepository.remove(ctx, input.id),
    );

    if (!removed) {
      throw new NotFoundError(`Product '${input.id}' not found`);
    }

    this.log.info({ productId: input.id }, "Product deleted");
  }
}