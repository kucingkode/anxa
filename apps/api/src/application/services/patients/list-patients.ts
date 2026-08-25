import { LIST_PATIENTS_USE_CASE, READ_ONLY_DB_TX } from "../../../constants.js";
import type {
  ListPatientsInput,
  ListPatientsOutput,
  ListPatientsUseCase,
} from "../../../domain/ports/in/patients/list-patients.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { PatientsRepository } from "../../../domain/ports/out/database/patients-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type ListPatientsServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  patientsRepository: PatientsRepository<TxCtx>;
};

export class ListPatientsService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements ListPatientsUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly patientsRepository: PatientsRepository<TxCtx>;

  constructor(deps: ListPatientsServiceDeps<TxCtx>) {
    super(LIST_PATIENTS_USE_CASE);

    this.db = deps.db;
    this.patientsRepository = deps.patientsRepository;
  }

  async listPatients(input: ListPatientsInput): Promise<ListPatientsOutput> {
    return this.db.beginTx(
      (ctx) => this.patientsRepository.list(ctx, input.limit ?? 20, input.query, input.offset ?? 0),
      READ_ONLY_DB_TX,
    );
  }
}
