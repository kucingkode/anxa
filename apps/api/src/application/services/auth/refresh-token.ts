import jwt from "jsonwebtoken";
import { REFRESH_TOKEN_USE_CASE } from "../../../constants.js";
import { UnauthorizedError } from "../../../domain/errors/domain/unauthorized-error.js";
import type {
  RefreshTokenInput,
  RefreshTokenOutput,
  RefreshTokenUseCase,
} from "../../../domain/ports/in/auth/refresh-token.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { RefreshTokensRepository } from "../../../domain/ports/out/database/refresh-tokens-repository.js";
import type { RolesRepository } from "../../../domain/ports/out/database/roles-repository.js";
import type { UsersRepository } from "../../../domain/ports/out/database/users-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";
import { generateOpaqueToken, hashToken } from "../../../shared/utils/tokens.js";

export type RefreshTokenServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  usersRepository: UsersRepository<TxCtx>;
  rolesRepository: RolesRepository<TxCtx>;
  refreshTokensRepository: RefreshTokensRepository<TxCtx>;
  jwtSecret: string;
  jwtExpiresIn: string;
  refreshTokenTtlSeconds: number;
};

export class RefreshTokenService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements RefreshTokenUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly usersRepository: UsersRepository<TxCtx>;
  private readonly rolesRepository: RolesRepository<TxCtx>;
  private readonly refreshTokensRepository: RefreshTokensRepository<TxCtx>;
  private readonly jwtSecret: string;
  private readonly jwtExpiresIn: string;
  private readonly refreshTokenTtlSeconds: number;

  constructor(deps: RefreshTokenServiceDeps<TxCtx>) {
    super(REFRESH_TOKEN_USE_CASE);
    this.db = deps.db;
    this.usersRepository = deps.usersRepository;
    this.rolesRepository = deps.rolesRepository;
    this.refreshTokensRepository = deps.refreshTokensRepository;
    this.jwtSecret = deps.jwtSecret;
    this.jwtExpiresIn = deps.jwtExpiresIn;
    this.refreshTokenTtlSeconds = deps.refreshTokenTtlSeconds;
  }

  async refreshToken(input: RefreshTokenInput): Promise<RefreshTokenOutput> {
    const tokenHash = hashToken(input.refreshToken);

    return this.db.beginTx(async (ctx) => {
      const record = await this.refreshTokensRepository.findByTokenHash(ctx, tokenHash);
      if (!record || record.revokedAt) {
        throw new UnauthorizedError("Invalid refresh token");
      }
      if (new Date(record.expiresAt).getTime() < Date.now()) {
        throw new UnauthorizedError("Refresh token expired");
      }

      const user = await this.usersRepository.getById(ctx, record.userId);
      if (!user) {
        throw new UnauthorizedError("User no longer exists");
      }

      const role = await this.rolesRepository.getById(ctx, user.roleId);
      if (!role) {
        throw new UnauthorizedError("User role no longer exists");
      }

      // Rotate: revoke the presented token and issue a new one.
      await this.refreshTokensRepository.revoke(ctx, tokenHash);
      const newRefreshToken = generateOpaqueToken();
      await this.refreshTokensRepository.create(ctx, {
        tokenHash: hashToken(newRefreshToken),
        userId: user.id,
        expiresAt: new Date(Date.now() + this.refreshTokenTtlSeconds * 1000).toISOString(),
      });

      const accessToken = jwt.sign(
        { sub: user.id, type: "access" },
        this.jwtSecret,
        { expiresIn: this.jwtExpiresIn } as jwt.SignOptions,
      );

      return {
        accessToken,
        refreshToken: newRefreshToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      };
    });
  }
}
