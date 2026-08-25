import { CREATE_USER_USE_CASE } from "../../../constants.js";
import { AlreadyExistsError } from "../../../domain/errors/domain/already-exists-error.js";
import type {
  CreateUserInput,
  CreateUserOutput,
  CreateUserUseCase,
} from "../../../domain/ports/in/users/create-user.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { UsersRepository } from "../../../domain/ports/out/database/users-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";
import { hash } from "bcryptjs";

export type CreateUserServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  usersRepository: UsersRepository<TxCtx>;
};

export class CreateUserService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements CreateUserUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly usersRepository: UsersRepository<TxCtx>;

  constructor(deps: CreateUserServiceDeps<TxCtx>) {
    super(CREATE_USER_USE_CASE);

    this.db = deps.db;
    this.usersRepository = deps.usersRepository;
  }

  async createUser(input: CreateUserInput): Promise<CreateUserOutput> {
    const existing = await this.db.beginTx((ctx) =>
      this.usersRepository.findByEmail(ctx, input.email),
    );

    if (existing) {
      throw new AlreadyExistsError(
        `User with email '${input.email}' already exists`,
      );
    }

    const hashedPassword = await hash(input.password, 10);

    const { password: _, ...userFields } = input;

    const user = await this.db.beginTx((ctx) =>
      this.usersRepository.create(ctx, {
        ...userFields,
        passwordHash: hashedPassword,
      }),
    );

    this.log.info({ userId: user.id }, "User created");
    return user;
  }
}