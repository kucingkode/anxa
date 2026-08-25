import type { NewManufacturer, Manufacturer, UpdateManufacturer } from "@simk/contracts";
import type { TxContext } from "./database.js";

export type ManufacturersRepository<TxCtx extends TxContext<any>> = {
  create(ctx: TxCtx, input: NewManufacturer): Promise<Manufacturer>;
  list(ctx: TxCtx, limit: number, query?: string, offset?: number): Promise<Manufacturer[]>;
  getById(ctx: TxCtx, id: string): Promise<Manufacturer | undefined>;
  update(ctx: TxCtx, id: string, input: UpdateManufacturer): Promise<Manufacturer | undefined>;
  remove(ctx: TxCtx, id: string): Promise<boolean>;
};