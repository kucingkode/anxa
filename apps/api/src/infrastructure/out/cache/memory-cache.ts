import { CACHE_PORT, OUTBOUND_DIRECTION } from "../../../constants.js";
import { CacheError } from "../../../domain/errors/infrastructure-errors.js";
import type { Cache } from "../../../domain/ports/out/cache.js";
import { BaseAdapter } from "../../../shared/classes/base-adapter.js";

export class MemoryCache extends BaseAdapter implements Cache {
  private readonly data = new Map<string, string>();

  constructor() {
    super(CACHE_PORT, OUTBOUND_DIRECTION, CacheError);
  }

  async set(key: string, value: string): Promise<void> {
    this.data.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    return this.data.get(key) ?? null;
  }

  async delete(key: string): Promise<void> {
    this.data.delete(key);
  }

  async clear(): Promise<void> {
    this.data.clear();
  }
}
