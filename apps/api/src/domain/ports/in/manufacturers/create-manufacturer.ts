import type { NewManufacturer, Manufacturer } from "@simk/contracts";

export type CreateManufacturerInput = NewManufacturer;
export type CreateManufacturerOutput = Manufacturer;

export type CreateManufacturerUseCase = {
  createManufacturer(input: CreateManufacturerInput): Promise<CreateManufacturerOutput>;
};