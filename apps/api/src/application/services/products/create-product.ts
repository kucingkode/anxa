import { CREATE_PRODUCT_USE_CASE } from "../../../constants.js";
import type {
  CreateProductInput,
  CreateProductOutput,
  CreateProductUseCase,
} from "../../../domain/ports/in/products/create-product.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { ProductsRepository } from "../../../domain/ports/out/database/products-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type CreateProductServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  productsRepository: ProductsRepository<TxCtx>;
};

export class CreateProductService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements CreateProductUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly productsRepository: ProductsRepository<TxCtx>;

  constructor(deps: CreateProductServiceDeps<TxCtx>) {
    super(CREATE_PRODUCT_USE_CASE);

    this.db = deps.db;
    this.productsRepository = deps.productsRepository;
  }

  async createProduct(
    input: CreateProductInput,
  ): Promise<CreateProductOutput> {
    const product = await this.db.beginTx((ctx) =>
      this.productsRepository.create(ctx, input),
    );

    this.log.info({ productId: product.id }, "Product created");
    return product;
  }
}