import type { Product, UpdateProduct } from "@simk/contracts";

export type UpdateProductInput = {
  id: string;
  changes: UpdateProduct;
};

export type UpdateProductOutput = Product;

export type UpdateProductUseCase = {
  updateProduct(input: UpdateProductInput): Promise<UpdateProductOutput>;
};