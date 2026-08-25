import { GET_ROLE_USE_CASE, READ_ONLY_DB_TX } from "../../../constants.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  GetRoleInput,
  GetRoleOutput,
  GetRoleUseCase,
} from "../../../domain/ports/in/roles/get-role.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { RolesRepository } from "../../../domain/ports/out/database/roles-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type GetRoleServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  rolesRepository: RolesRepository<TxCtx>;
};

export class GetRoleService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements GetRoleUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly rolesRepository: RolesRepository<TxCtx>;

  constructor(deps: GetRoleServiceDeps<TxCtx>) {
    super(GET_ROLE_USE_CASE);
    this.db = deps.db;
    this.rolesRepository = deps.rolesRepository;
  }

  async getRole(input: GetRoleInput): Promise<GetRoleOutput> {
    const role = await this.db.beginTx(
      (ctx) => this.rolesRepository.getById(ctx, input.id),
      READ_ONLY_DB_TX,
    );

    if (!role) {
      throw new NotFoundError(`Role '${input.id}' not found`);
    }

    return role;
  }
}
