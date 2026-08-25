import { GET_AUTH_USER_USE_CASE, READ_ONLY_DB_TX } from "../../../constants.js";
import { UnauthorizedError } from "../../../domain/errors/domain/unauthorized-error.js";
import type {
  GetAuthUserInput,
  GetAuthUserOutput,
  GetAuthUserUseCase,
} from "../../../domain/ports/in/auth/get-auth-user.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { RolesRepository } from "../../../domain/ports/out/database/roles-repository.js";
import type { UsersRepository } from "../../../domain/ports/out/database/users-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type GetAuthUserServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  usersRepository: UsersRepository<TxCtx>;
  rolesRepository: RolesRepository<TxCtx>;
};

export class GetAuthUserService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements GetAuthUserUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly usersRepository: UsersRepository<TxCtx>;
  private readonly rolesRepository: RolesRepository<TxCtx>;

  constructor(deps: GetAuthUserServiceDeps<TxCtx>) {
    super(GET_AUTH_USER_USE_CASE);
    this.db = deps.db;
    this.usersRepository = deps.usersRepository;
    this.rolesRepository = deps.rolesRepository;
  }

  async getAuthUser(input: GetAuthUserInput): Promise<GetAuthUserOutput> {
    return this.db.beginTx(async (ctx) => {
      const user = await this.usersRepository.getById(ctx, input.userId);
      if (!user) {
        throw new UnauthorizedError("User no longer exists");
      }

      const role = await this.rolesRepository.getById(ctx, user.roleId);
      if (!role) {
        throw new UnauthorizedError("Role no longer exists");
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    }, READ_ONLY_DB_TX);
  }
}
