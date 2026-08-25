import type { Product } from "@simk/contracts";

export type GetProductInput = {
  id: string;
};

export type GetProductOutput = Product;

export type GetProductUseCase = {
  getProduct(input: GetProductInput): Promise<GetProductOutput>;
};