import { UPDATE_ROLE_USE_CASE } from "../../../constants.js";
import { AlreadyExistsError } from "../../../domain/errors/domain/already-exists-error.js";
import { ConflictError } from "../../../domain/errors/domain/conflict-error.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import { ValidationError } from "../../../domain/errors/domain/validation-error.js";
import { isPermission } from "../../../domain/permissions.js";
import type {
  UpdateRoleInput,
  UpdateRoleOutput,
  UpdateRoleUseCase,
} from "../../../domain/ports/in/roles/update-role.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { RolesRepository } from "../../../domain/ports/out/database/roles-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type UpdateRoleServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  rolesRepository: RolesRepository<TxCtx>;
};

export class UpdateRoleService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements UpdateRoleUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly rolesRepository: RolesRepository<TxCtx>;

  constructor(deps: UpdateRoleServiceDeps<TxCtx>) {
    super(UPDATE_ROLE_USE_CASE);
    this.db = deps.db;
    this.rolesRepository = deps.rolesRepository;
  }

  async updateRole(input: UpdateRoleInput): Promise<UpdateRoleOutput> {
    if (input.changes.permissions) {
      for (const p of input.changes.permissions) {
        if (!isPermission(p)) {
          throw new ValidationError(`Invalid permission '${p}'`);
        }
      }
    }

    const role = await this.db.beginTx((ctx) =>
      this.rolesRepository.getById(ctx, input.id),
    );

    if (!role) {
      throw new NotFoundError(`Role '${input.id}' not found`);
    }

    if (role.isSystem) {
      throw new ConflictError("System role cannot be modified");
    }

    if (input.changes.name && input.changes.name !== role.name) {
      const duplicate = await this.db.beginTx((ctx) =>
        this.rolesRepository.findByName(ctx, input.changes.name!),
      );
      if (duplicate) {
        throw new AlreadyExistsError(`Role '${input.changes.name}' already exists`);
      }
    }

    const updated = await this.db.beginTx((ctx) =>
      this.rolesRepository.update(ctx, input.id, input.changes),
    );

    if (!updated) {
      throw new NotFoundError(`Role '${input.id}' not found`);
    }

    this.log.info({ roleId: updated.id }, "Role updated");
    return updated;
  }
}
