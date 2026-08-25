import { LOGOUT_USE_CASE } from "../../../constants.js";
import type {
  LogoutInput,
  LogoutOutput,
  LogoutUseCase,
} from "../../../domain/ports/in/auth/logout.js";
import type { Cache } from "../../../domain/ports/out/cache.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { RefreshTokensRepository } from "../../../domain/ports/out/database/refresh-tokens-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";
import { hashToken } from "../../../shared/utils/tokens.js";

export type LogoutServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  refreshTokensRepository: RefreshTokensRepository<TxCtx>;
  cache?: Cache;
};

export class LogoutService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements LogoutUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly refreshTokensRepository: RefreshTokensRepository<TxCtx>;
  private readonly cache?: Cache;

  constructor(deps: LogoutServiceDeps<TxCtx>) {
    super(LOGOUT_USE_CASE);
    this.db = deps.db;
    this.refreshTokensRepository = deps.refreshTokensRepository;
    this.cache = deps.cache;
  }

  async logout(input: LogoutInput): Promise<LogoutOutput> {
    if (input.accessToken) {
      await this.cache?.set(`blacklist:${input.accessToken}`, "1");
    }
    if (input.refreshToken) {
      await this.db.beginTx((ctx) =>
        this.refreshTokensRepository.revoke(ctx, hashToken(input.refreshToken!)),
      );
    }
    this.log.info("User logged out");
  }
}
