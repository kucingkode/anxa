import type { NewProduct, Product, UpdateProduct } from "@simk/contracts";
import type { TxContext } from "./database.js";

export type ProductsRepository<TxCtx extends TxContext<any>> = {
  create(ctx: TxCtx, input: NewProduct): Promise<Product>;
  list(ctx: TxCtx, limit: number, query?: string, manufacturerId?: string, offset?: number): Promise<Product[]>;
  getById(ctx: TxCtx, id: string): Promise<Product | undefined>;
  update(ctx: TxCtx, id: string, input: UpdateProduct): Promise<Product | undefined>;
  remove(ctx: TxCtx, id: string): Promise<boolean>;
};