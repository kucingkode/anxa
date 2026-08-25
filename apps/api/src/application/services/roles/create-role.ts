import { CREATE_ROLE_USE_CASE } from "../../../constants.js";
import { AlreadyExistsError } from "../../../domain/errors/domain/already-exists-error.js";
import { ValidationError } from "../../../domain/errors/domain/validation-error.js";
import { isPermission } from "../../../domain/permissions.js";
import type {
  CreateRoleInput,
  CreateRoleOutput,
  CreateRoleUseCase,
} from "../../../domain/ports/in/roles/create-role.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { RolesRepository } from "../../../domain/ports/out/database/roles-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type CreateRoleServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  rolesRepository: RolesRepository<TxCtx>;
};

export class CreateRoleService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements CreateRoleUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly rolesRepository: RolesRepository<TxCtx>;

  constructor(deps: CreateRoleServiceDeps<TxCtx>) {
    super(CREATE_ROLE_USE_CASE);
    this.db = deps.db;
    this.rolesRepository = deps.rolesRepository;
  }

  async createRole(input: CreateRoleInput): Promise<CreateRoleOutput> {
    for (const p of input.permissions) {
      if (!isPermission(p)) {
        throw new ValidationError(`Invalid permission '${p}'`);
      }
    }

    const existing = await this.db.beginTx((ctx) =>
      this.rolesRepository.findByName(ctx, input.name),
    );
    if (existing) {
      throw new AlreadyExistsError(`Role '${input.name}' already exists`);
    }

    const role = await this.db.beginTx((ctx) =>
      this.rolesRepository.create(ctx, {
        name: input.name,
        description: input.description,
        permissions: input.permissions,
        isSystem: false,
      }),
    );

    this.log.info({ roleId: role.id }, "Role created");
    return role;
  }
}
