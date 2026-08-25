export type DeleteProductInput = {
  id: string;
};

export type DeleteProductOutput = void;

export type DeleteProductUseCase = {
  deleteProduct(input: DeleteProductInput): Promise<DeleteProductOutput>;
};