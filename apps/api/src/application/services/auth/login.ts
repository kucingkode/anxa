import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { LOGIN_USE_CASE } from "../../../constants.js";
import { InvalidCredentialsError } from "../../../domain/errors/domain/invalid-credentials-error.js";
import { UnauthorizedError } from "../../../domain/errors/domain/unauthorized-error.js";
import type {
  LoginInput,
  LoginOutput,
  LoginUseCase,
} from "../../../domain/ports/in/auth/login.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { RefreshTokensRepository } from "../../../domain/ports/out/database/refresh-tokens-repository.js";
import type { RolesRepository } from "../../../domain/ports/out/database/roles-repository.js";
import type { UsersRepository } from "../../../domain/ports/out/database/users-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";
import { generateOpaqueToken, hashToken } from "../../../shared/utils/tokens.js";

export type LoginServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  usersRepository: UsersRepository<TxCtx>;
  rolesRepository: RolesRepository<TxCtx>;
  refreshTokensRepository: RefreshTokensRepository<TxCtx>;
  jwtSecret: string;
  jwtExpiresIn: string;
  refreshTokenTtlSeconds: number;
};

export class LoginService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements LoginUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly usersRepository: UsersRepository<TxCtx>;
  private readonly rolesRepository: RolesRepository<TxCtx>;
  private readonly refreshTokensRepository: RefreshTokensRepository<TxCtx>;
  private readonly jwtSecret: string;
  private readonly jwtExpiresIn: string;
  private readonly refreshTokenTtlSeconds: number;

  constructor(deps: LoginServiceDeps<TxCtx>) {
    super(LOGIN_USE_CASE);
    this.db = deps.db;
    this.usersRepository = deps.usersRepository;
    this.rolesRepository = deps.rolesRepository;
    this.refreshTokensRepository = deps.refreshTokensRepository;
    this.jwtSecret = deps.jwtSecret;
    this.jwtExpiresIn = deps.jwtExpiresIn;
    this.refreshTokenTtlSeconds = deps.refreshTokenTtlSeconds;
  }

  async login(input: LoginInput): Promise<LoginOutput> {
    return this.db.beginTx(async (ctx) => {
      const user = await this.usersRepository.findByEmail(ctx, input.email);
      if (!user) {
        throw new InvalidCredentialsError();
      }

      const valid = await compare(input.password, user.passwordHash);
      if (!valid) {
        throw new InvalidCredentialsError();
      }

      const role = await this.rolesRepository.getById(ctx, user.roleId);
      if (!role) {
        throw new UnauthorizedError("User role no longer exists");
      }

      const accessToken = jwt.sign(
        { sub: user.id, type: "access" },
        this.jwtSecret,
        { expiresIn: this.jwtExpiresIn } as jwt.SignOptions,
      );

      const refreshToken = generateOpaqueToken();
      await this.refreshTokensRepository.create(ctx, {
        tokenHash: hashToken(refreshToken),
        userId: user.id,
        expiresAt: new Date(Date.now() + this.refreshTokenTtlSeconds * 1000).toISOString(),
      });

      this.log.info({ userId: user.id }, "User logged in");
      return {
        accessToken,
        refreshToken,
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
