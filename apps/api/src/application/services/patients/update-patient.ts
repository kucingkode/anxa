import { UPDATE_PATIENT_USE_CASE, cacheNamespaces } from "../../../constants.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  UpdatePatientInput,
  UpdatePatientOutput,
  UpdatePatientUseCase,
} from "../../../domain/ports/in/patients/update-patient.js";
import type { Cache } from "../../../domain/ports/out/cache.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { PatientsRepository } from "../../../domain/ports/out/database/patients-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type UpdatePatientServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  patientsRepository: PatientsRepository<TxCtx>;
  cache?: Cache;
};

export class UpdatePatientService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements UpdatePatientUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly patientsRepository: PatientsRepository<TxCtx>;
  private readonly cache?: Cache;

  constructor(deps: UpdatePatientServiceDeps<TxCtx>) {
    super(UPDATE_PATIENT_USE_CASE);

    this.db = deps.db;
    this.patientsRepository = deps.patientsRepository;
    this.cache = deps.cache;
  }

  async updatePatient(input: UpdatePatientInput): Promise<UpdatePatientOutput> {
    const patient = await this.db.beginTx((ctx) =>
      this.patientsRepository.update(ctx, input.id, input.changes),
    );

    if (!patient) {
      throw new NotFoundError(`Patient '${input.id}' not found`);
    }

    if (this.cache) {
      await this.cache.delete(`${cacheNamespaces.PATIENTS}:${input.id}`);
    }

    this.log.info({ patientId: patient.id }, "Patient updated");
    return patient;
  }
}
