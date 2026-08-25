import { GET_USER_USE_CASE, READ_ONLY_DB_TX } from "../../../constants.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  GetUserInput,
  GetUserOutput,
  GetUserUseCase,
} from "../../../domain/ports/in/users/get-user.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { UsersRepository } from "../../../domain/ports/out/database/users-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type GetUserServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  usersRepository: UsersRepository<TxCtx>;
};

export class GetUserService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements GetUserUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly usersRepository: UsersRepository<TxCtx>;

  constructor(deps: GetUserServiceDeps<TxCtx>) {
    super(GET_USER_USE_CASE);

    this.db = deps.db;
    this.usersRepository = deps.usersRepository;
  }

  async getUser(input: GetUserInput): Promise<GetUserOutput> {
    const user = await this.db.beginTx(
      (ctx) => this.usersRepository.getById(ctx, input.id),
      READ_ONLY_DB_TX,
    );

    if (!user) {
      throw new NotFoundError(`User '${input.id}' not found`);
    }

    return user;
  }
}