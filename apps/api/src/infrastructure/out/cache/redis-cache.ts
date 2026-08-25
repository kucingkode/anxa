import type Redis from "ioredis";
import { CACHE_PORT, OUTBOUND_DIRECTION } from "../../../constants.js";
import { CacheError } from "../../../domain/errors/infrastructure-errors.js";
import type { Cache } from "../../../domain/ports/out/cache.js";
import { BaseAdapter } from "../../../shared/classes/base-adapter.js";

export class RedisCache extends BaseAdapter implements Cache {
  constructor(private readonly client: Redis) {
    super(CACHE_PORT, OUTBOUND_DIRECTION, CacheError);
  }

  async set(key: string, value: string): Promise<void> {
    await this.call(() => this.client.set(key, value), "set: redis set failed");
  }

  async get(key: string): Promise<string | null> {
    return this.call(() => this.client.get(key), "get: redis get failed");
  }

  async delete(key: string): Promise<void> {
    await this.call(() => this.client.del(key), "delete: redis del failed");
  }

  async clear(): Promise<void> {
    await this.call(() => this.client.flushdb(), "clear: redis flushdb failed");
  }
}
