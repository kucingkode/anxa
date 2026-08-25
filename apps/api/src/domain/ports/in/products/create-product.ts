import type { NewProduct, Product } from "@simk/contracts";

export type CreateProductInput = NewProduct;
export type CreateProductOutput = Product;

export type CreateProductUseCase = {
  createProduct(input: CreateProductInput): Promise<CreateProductOutput>;
};