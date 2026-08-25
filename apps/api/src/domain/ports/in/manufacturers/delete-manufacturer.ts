export type DeleteManufacturerInput = {
  id: string;
};

export type DeleteManufacturerOutput = void;

export type DeleteManufacturerUseCase = {
  deleteManufacturer(input: DeleteManufacturerInput): Promise<DeleteManufacturerOutput>;
};