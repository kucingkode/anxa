import { LIST_ROLES_USE_CASE, READ_ONLY_DB_TX } from "../../../constants.js";
import type {
  ListRolesInput,
  ListRolesOutput,
  ListRolesUseCase,
} from "../../../domain/ports/in/roles/list-roles.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { RolesRepository } from "../../../domain/ports/out/database/roles-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type ListRolesServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  rolesRepository: RolesRepository<TxCtx>;
};

export class ListRolesService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements ListRolesUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly rolesRepository: RolesRepository<TxCtx>;

  constructor(deps: ListRolesServiceDeps<TxCtx>) {
    super(LIST_ROLES_USE_CASE);
    this.db = deps.db;
    this.rolesRepository = deps.rolesRepository;
  }

  async listRoles(input: ListRolesInput): Promise<ListRolesOutput> {
    return this.db.beginTx(
      (ctx) =>
        this.rolesRepository.list(
          ctx,
          input.limit ?? 20,
          input.query,
          input.offset ?? 0,
        ),
      READ_ONLY_DB_TX,
    );
  }
}
