import type { Manufacturer } from "@simk/contracts";

export type GetManufacturerInput = {
  id: string;
};

export type GetManufacturerOutput = Manufacturer;

export type GetManufacturerUseCase = {
  getManufacturer(input: GetManufacturerInput): Promise<GetManufacturerOutput>;
};