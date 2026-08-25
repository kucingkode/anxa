import { LIST_USERS_USE_CASE, READ_ONLY_DB_TX } from "../../../constants.js";
import type {
  ListUsersInput,
  ListUsersOutput,
  ListUsersUseCase,
} from "../../../domain/ports/in/users/list-users.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { UsersRepository } from "../../../domain/ports/out/database/users-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type ListUsersServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  usersRepository: UsersRepository<TxCtx>;
};

export class ListUsersService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements ListUsersUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly usersRepository: UsersRepository<TxCtx>;

  constructor(deps: ListUsersServiceDeps<TxCtx>) {
    super(LIST_USERS_USE_CASE);

    this.db = deps.db;
    this.usersRepository = deps.usersRepository;
  }

  async listUsers(input: ListUsersInput): Promise<ListUsersOutput> {
    return this.db.beginTx(
      (ctx) =>
        this.usersRepository.list(
          ctx,
          input.limit ?? 20,
          input.query,
          input.roleId,
          input.offset ?? 0,
        ),
      READ_ONLY_DB_TX,
    );
  }
}