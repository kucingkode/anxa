import { randomUUID } from "node:crypto";
import type { Manufacturer, NewManufacturer, UpdateManufacturer } from "@simk/contracts";
import {
  MANUFACTURERS_REPOSITORY_PORT,
  OUTBOUND_DIRECTION,
} from "../../../../constants.js";
import { ManufacturersRepositoryError } from "../../../../domain/errors/infrastructure-errors.js";
import type { ManufacturersRepository } from "../../../../domain/ports/out/database/manufacturers-repository.js";
import { BaseAdapter } from "../../../../shared/classes/base-adapter.js";
import type { MemoryTxContext } from "./database.js";

export class MemoryManufacturersRepository
  extends BaseAdapter
  implements ManufacturersRepository<MemoryTxContext>
{
  private readonly manufacturers = new Map<string, Manufacturer>();
  private readonly deleted = new Set<string>();

  constructor() {
    super(MANUFACTURERS_REPOSITORY_PORT, OUTBOUND_DIRECTION, ManufacturersRepositoryError);
  }

  async create(
    _ctx: MemoryTxContext,
    input: NewManufacturer,
  ): Promise<Manufacturer> {
    const now = new Date().toISOString();
    const manufacturer: Manufacturer = {
      id: randomUUID(),
      createdAt: now,
      updatedAt: now,
      ...input,
    };
    this.manufacturers.set(manufacturer.id, manufacturer);
    return manufacturer;
  }

  async list(
    _ctx: MemoryTxContext,
    limit: number,
    query?: string,
    offset = 0,
  ): Promise<Manufacturer[]> {
    const matches = [...this.manufacturers.values()].filter(
      (m) => !this.deleted.has(m.id),
    );
    if (!query) {
      return matches.slice(offset, offset + limit);
    }

    const needle = query.toLowerCase();
    return matches
      .filter(
        (m) =>
          m.name.toLowerCase().includes(needle) ||
          m.identifier.toLowerCase().includes(needle),
      )
      .slice(offset, offset + limit);
  }

  async getById(
    _ctx: MemoryTxContext,
    id: string,
  ): Promise<Manufacturer | undefined> {
    const manufacturer = this.manufacturers.get(id);
    return manufacturer && !this.deleted.has(id) ? manufacturer : undefined;
  }

  async update(
    ctx: MemoryTxContext,
    id: string,
    input: UpdateManufacturer,
  ): Promise<Manufacturer | undefined> {
    const manufacturer = await this.getById(ctx, id);
    if (!manufacturer) return undefined;

    const updated: Manufacturer = {
      ...manufacturer,
      name: input.name ?? manufacturer.name,
      identifier: input.identifier ?? manufacturer.identifier,
      contact: input.contact ?? manufacturer.contact,
      updatedAt: new Date().toISOString(),
    };
    this.manufacturers.set(id, updated);
    return updated;
  }

  async remove(_ctx: MemoryTxContext, id: string): Promise<boolean> {
    if (!this.manufacturers.has(id) || this.deleted.has(id)) {
      return false;
    }
    this.deleted.add(id);
    return true;
  }
}