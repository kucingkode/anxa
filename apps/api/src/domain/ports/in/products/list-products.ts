import type { Product } from "@simk/contracts";

export type ListProductsInput = {
  limit?: number;
  offset?: number;
  query?: string;
  manufacturerId?: string;
};

export type ListProductsOutput = Product[];

export type ListProductsUseCase = {
  listProducts(input: ListProductsInput): Promise<ListProductsOutput>;
};