import type { Manufacturer } from "@simk/contracts";

export type ListManufacturersInput = {
  limit?: number;
  offset?: number;
  query?: string;
};

export type ListManufacturersOutput = Manufacturer[];

export type ListManufacturersUseCase = {
  listManufacturers(input: ListManufacturersInput): Promise<ListManufacturersOutput>;
};