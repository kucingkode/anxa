import type { TxContext } from "./database.js";

export type RefreshTokenRecord = {
  id: string;
  tokenHash: string;
  userId: string;
  expiresAt: string;
  createdAt: string;
  revokedAt?: string;
};

export type RefreshTokensRepository<TxCtx extends TxContext<any>> = {
  create(
    ctx: TxCtx,
    input: { tokenHash: string; userId: string; expiresAt: string },
  ): Promise<void>;
  findByTokenHash(
    ctx: TxCtx,
    tokenHash: string,
  ): Promise<RefreshTokenRecord | undefined>;
  revoke(ctx: TxCtx, tokenHash: string): Promise<void>;
};
