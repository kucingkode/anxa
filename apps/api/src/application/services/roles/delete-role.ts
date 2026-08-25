import { DELETE_ROLE_USE_CASE } from "../../../constants.js";
import { ConflictError } from "../../../domain/errors/domain/conflict-error.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  DeleteRoleInput,
  DeleteRoleOutput,
  DeleteRoleUseCase,
} from "../../../domain/ports/in/roles/delete-role.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { RolesRepository } from "../../../domain/ports/out/database/roles-repository.js";
import type { UsersRepository } from "../../../domain/ports/out/database/users-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type DeleteRoleServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  rolesRepository: RolesRepository<TxCtx>;
  usersRepository: UsersRepository<TxCtx>;
};

export class DeleteRoleService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements DeleteRoleUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly rolesRepository: RolesRepository<TxCtx>;
  private readonly usersRepository: UsersRepository<TxCtx>;

  constructor(deps: DeleteRoleServiceDeps<TxCtx>) {
    super(DELETE_ROLE_USE_CASE);
    this.db = deps.db;
    this.rolesRepository = deps.rolesRepository;
    this.usersRepository = deps.usersRepository;
  }

  async deleteRole(input: DeleteRoleInput): Promise<DeleteRoleOutput> {
    const role = await this.db.beginTx((ctx) =>
      this.rolesRepository.getById(ctx, input.id),
    );

    if (!role) {
      throw new NotFoundError(`Role '${input.id}' not found`);
    }

    if (role.isSystem) {
      throw new ConflictError("System role cannot be deleted");
    }

    const usersWithRole = await this.db.beginTx((ctx) =>
      this.usersRepository.list(ctx, 1, undefined, input.id),
    );
    if (usersWithRole.length > 0) {
      throw new ConflictError("Role is still assigned to users");
    }

    const removed = await this.db.beginTx((ctx) =>
      this.rolesRepository.remove(ctx, input.id),
    );
    if (!removed) {
      throw new NotFoundError(`Role '${input.id}' not found`);
    }

    this.log.info({ roleId: input.id }, "Role deleted");
  }
}
