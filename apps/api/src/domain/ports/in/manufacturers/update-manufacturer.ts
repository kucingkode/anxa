import type { Manufacturer, UpdateManufacturer } from "@simk/contracts";

export type UpdateManufacturerInput = {
  id: string;
  changes: UpdateManufacturer;
};

export type UpdateManufacturerOutput = Manufacturer;

export type UpdateManufacturerUseCase = {
  updateManufacturer(input: UpdateManufacturerInput): Promise<UpdateManufacturerOutput>;
};