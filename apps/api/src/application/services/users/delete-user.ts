import { DELETE_USER_USE_CASE } from "../../../constants.js";
import { ConflictError } from "../../../domain/errors/domain/conflict-error.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  DeleteUserInput,
  DeleteUserOutput,
  DeleteUserUseCase,
} from "../../../domain/ports/in/users/delete-user.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { UsersRepository } from "../../../domain/ports/out/database/users-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type DeleteUserServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  usersRepository: UsersRepository<TxCtx>;
};

export class DeleteUserService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements DeleteUserUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly usersRepository: UsersRepository<TxCtx>;

  constructor(deps: DeleteUserServiceDeps<TxCtx>) {
    super(DELETE_USER_USE_CASE);

    this.db = deps.db;
    this.usersRepository = deps.usersRepository;
  }

  async deleteUser(input: DeleteUserInput): Promise<DeleteUserOutput> {
    if (input.callerId === input.id) {
      throw new ConflictError("Cannot delete yourself");
    }

    const removed = await this.db.beginTx((ctx) =>
      this.usersRepository.remove(ctx, input.id),
    );

    if (!removed) {
      throw new NotFoundError(`User '${input.id}' not found`);
    }

    this.log.info({ userId: input.id }, "User deleted");
  }
}