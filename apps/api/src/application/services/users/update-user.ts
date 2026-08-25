import { UPDATE_USER_USE_CASE } from "../../../constants.js";
import { AlreadyExistsError } from "../../../domain/errors/domain/already-exists-error.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  UpdateUserInput,
  UpdateUserOutput,
  UpdateUserUseCase,
} from "../../../domain/ports/in/users/update-user.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { UsersRepository } from "../../../domain/ports/out/database/users-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";
import { hash } from "bcryptjs";

export type UpdateUserServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  usersRepository: UsersRepository<TxCtx>;
};

export class UpdateUserService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements UpdateUserUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly usersRepository: UsersRepository<TxCtx>;

  constructor(deps: UpdateUserServiceDeps<TxCtx>) {
    super(UPDATE_USER_USE_CASE);

    this.db = deps.db;
    this.usersRepository = deps.usersRepository;
  }

  async updateUser(input: UpdateUserInput): Promise<UpdateUserOutput> {
    const existing = await this.db.beginTx((ctx) =>
      this.usersRepository.getById(ctx, input.id),
    );

    if (!existing) {
      throw new NotFoundError(`User '${input.id}' not found`);
    }

    const { changes } = input;

    if (changes.email && changes.email !== existing.email) {
      const duplicate = await this.db.beginTx((ctx) =>
        this.usersRepository.findByEmail(ctx, changes.email!),
      );

      if (duplicate) {
        throw new AlreadyExistsError(
          `User with email '${changes.email}' already exists`,
        );
      }
    }

    let passwordHash: string | undefined;
    if (changes.password) {
      passwordHash = await hash(changes.password, 10);
    }

    const { password: _, ...updateFields } = changes;

    const user = await this.db.beginTx((ctx) =>
      this.usersRepository.update(ctx, input.id, {
        ...updateFields,
        passwordHash,
      }),
    );

    if (!user) {
      throw new NotFoundError(`User '${input.id}' not found`);
    }

    this.log.info({ userId: user.id }, "User updated");
    return user;
  }
}