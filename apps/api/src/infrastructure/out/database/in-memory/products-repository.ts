import { randomUUID } from "node:crypto";
import type { NewProduct, Product, UpdateProduct } from "@simk/contracts";
import {
  OUTBOUND_DIRECTION,
  PRODUCTS_REPOSITORY_PORT,
} from "../../../../constants.js";
import { ProductsRepositoryError } from "../../../../domain/errors/infrastructure-errors.js";
import type { ProductsRepository } from "../../../../domain/ports/out/database/products-repository.js";
import { BaseAdapter } from "../../../../shared/classes/base-adapter.js";
import type { MemoryTxContext } from "./database.js";

export class MemoryProductsRepository
  extends BaseAdapter
  implements ProductsRepository<MemoryTxContext>
{
  private readonly products = new Map<string, Product>();
  private readonly deleted = new Set<string>();

  constructor() {
    super(PRODUCTS_REPOSITORY_PORT, OUTBOUND_DIRECTION, ProductsRepositoryError);
  }

  async create(
    _ctx: MemoryTxContext,
    input: NewProduct,
  ): Promise<Product> {
    const now = new Date().toISOString();
    const product: Product = {
      id: randomUUID(),
      createdAt: now,
      updatedAt: now,
      ...input,
    };
    this.products.set(product.id, product);
    return product;
  }

  async list(
    _ctx: MemoryTxContext,
    limit: number,
    query?: string,
    manufacturerId?: string,
    offset = 0,
  ): Promise<Product[]> {
    let matches = [...this.products.values()].filter(
      (p) => !this.deleted.has(p.id),
    );
    if (manufacturerId) {
      matches = matches.filter((p) => p.manufacturerId === manufacturerId);
    }
    if (query) {
      const needle = query.toLowerCase();
      matches = matches.filter(
        (p) =>
          p.name.toLowerCase().includes(needle) ||
          p.code.toLowerCase().includes(needle),
      );
    }
    return matches.slice(offset, offset + limit);
  }

  async getById(
    _ctx: MemoryTxContext,
    id: string,
  ): Promise<Product | undefined> {
    const product = this.products.get(id);
    return product && !this.deleted.has(id) ? product : undefined;
  }

  async update(
    ctx: MemoryTxContext,
    id: string,
    input: UpdateProduct,
  ): Promise<Product | undefined> {
    const product = await this.getById(ctx, id);
    if (!product) return undefined;

    const updated: Product = {
      ...product,
      name: input.name ?? product.name,
      code: input.code ?? product.code,
      unit: input.unit ?? product.unit,
      manufacturerId: input.manufacturerId ?? product.manufacturerId,
      description: input.description ?? product.description,
      updatedAt: new Date().toISOString(),
    };
    this.products.set(id, updated);
    return updated;
  }

  async remove(_ctx: MemoryTxContext, id: string): Promise<boolean> {
    if (!this.products.has(id) || this.deleted.has(id)) {
      return false;
    }
    this.deleted.add(id);
    return true;
  }
}