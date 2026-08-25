import { randomUUID } from "node:crypto";
import {
  OUTBOUND_DIRECTION,
  REFRESH_TOKENS_REPOSITORY_PORT,
} from "../../../../constants.js";
import { RefreshTokensRepositoryError } from "../../../../domain/errors/infrastructure-errors.js";
import type {
  RefreshTokenRecord,
  RefreshTokensRepository,
} from "../../../../domain/ports/out/database/refresh-tokens-repository.js";
import { BaseAdapter } from "../../../../shared/classes/base-adapter.js";
import type { MemoryTxContext } from "./database.js";

export class MemoryRefreshTokensRepository
  extends BaseAdapter
  implements RefreshTokensRepository<MemoryTxContext>
{
  private readonly records = new Map<string, RefreshTokenRecord>();

  constructor() {
    super(REFRESH_TOKENS_REPOSITORY_PORT, OUTBOUND_DIRECTION, RefreshTokensRepositoryError);
  }

  async create(
    _ctx: MemoryTxContext,
    input: { tokenHash: string; userId: string; expiresAt: string },
  ): Promise<void> {
    this.records.set(input.tokenHash, {
      id: randomUUID(),
      tokenHash: input.tokenHash,
      userId: input.userId,
      expiresAt: input.expiresAt,
      createdAt: new Date().toISOString(),
    });
  }

  async findByTokenHash(
    _ctx: MemoryTxContext,
    tokenHash: string,
  ): Promise<RefreshTokenRecord | undefined> {
    return this.records.get(tokenHash);
  }

  async revoke(_ctx: MemoryTxContext, tokenHash: string): Promise<void> {
    const record = this.records.get(tokenHash);
    if (record && !record.revokedAt) {
      record.revokedAt = new Date().toISOString();
    }
  }
}
