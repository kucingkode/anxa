import { DELETE_PATIENT_USE_CASE, cacheNamespaces } from "../../../constants.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  DeletePatientInput,
  DeletePatientOutput,
  DeletePatientUseCase,
} from "../../../domain/ports/in/patients/delete-patient.js";
import type { Cache } from "../../../domain/ports/out/cache.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { PatientsRepository } from "../../../domain/ports/out/database/patients-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type DeletePatientServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  patientsRepository: PatientsRepository<TxCtx>;
  cache?: Cache;
};

export class DeletePatientService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements DeletePatientUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly patientsRepository: PatientsRepository<TxCtx>;
  private readonly cache?: Cache;

  constructor(deps: DeletePatientServiceDeps<TxCtx>) {
    super(DELETE_PATIENT_USE_CASE);

    this.db = deps.db;
    this.patientsRepository = deps.patientsRepository;
    this.cache = deps.cache;
  }

  async deletePatient(input: DeletePatientInput): Promise<DeletePatientOutput> {
    const removed = await this.db.beginTx((ctx) =>
      this.patientsRepository.remove(ctx, input.id),
    );

    if (!removed) {
      throw new NotFoundError(`Patient '${input.id}' not found`);
    }

    if (this.cache) {
      await this.cache.delete(`${cacheNamespaces.PATIENTS}:${input.id}`);
    }

    this.log.info({ patientId: input.id }, "Patient deleted");
  }
}
