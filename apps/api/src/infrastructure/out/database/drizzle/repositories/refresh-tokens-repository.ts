import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import {
  OUTBOUND_DIRECTION,
  REFRESH_TOKENS_REPOSITORY_PORT,
} from "../../../../../constants.js";
import { RefreshTokensRepositoryError } from "../../../../../domain/errors/infrastructure-errors.js";
import type {
  RefreshTokenRecord,
  RefreshTokensRepository,
} from "../../../../../domain/ports/out/database/refresh-tokens-repository.js";
import { BaseAdapter } from "../../../../../shared/classes/base-adapter.js";
import type { DrizzleTxContext } from "../database.js";
import { refreshTokens } from "../schema.js";

function toRecord(row: typeof refreshTokens.$inferSelect): RefreshTokenRecord {
  return {
    id: row.id,
    tokenHash: row.tokenHash,
    userId: row.userId,
    expiresAt: row.expiresAt.toISOString(),
    createdAt: row.createdAt.toISOString(),
    revokedAt: row.revokedAt?.toISOString(),
  };
}

export class DrizzleRefreshTokensRepository
  extends BaseAdapter
  implements RefreshTokensRepository<DrizzleTxContext>
{
  constructor() {
    super(REFRESH_TOKENS_REPOSITORY_PORT, OUTBOUND_DIRECTION, RefreshTokensRepositoryError);
  }

  async create(
    ctx: DrizzleTxContext,
    input: { tokenHash: string; userId: string; expiresAt: string },
  ): Promise<void> {
    await ctx.tx.insert(refreshTokens).values({
      id: randomUUID(),
      tokenHash: input.tokenHash,
      userId: input.userId,
      expiresAt: new Date(input.expiresAt),
      createdAt: new Date(),
    });
  }

  async findByTokenHash(
    ctx: DrizzleTxContext,
    tokenHash: string,
  ): Promise<RefreshTokenRecord | undefined> {
    const row = await ctx.tx.query.refreshTokens.findFirst({
      where: eq(refreshTokens.tokenHash, tokenHash),
    });
    return row ? toRecord(row) : undefined;
  }

  async revoke(ctx: DrizzleTxContext, tokenHash: string): Promise<void> {
    await ctx.tx
      .update(refreshTokens)
      .set({ revokedAt: new Date() })
      .where(eq(refreshTokens.tokenHash, tokenHash));
  }
}
