import {
  GET_PATIENT_USE_CASE,
  READ_ONLY_DB_TX,
  cacheNamespaces,
} from "../../../constants.js";
import { NotFoundError } from "../../../domain/errors/domain/not-found-error.js";
import type {
  GetPatientInput,
  GetPatientOutput,
  GetPatientUseCase,
} from "../../../domain/ports/in/patients/get-patient.js";
import type { Cache } from "../../../domain/ports/out/cache.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { PatientsRepository } from "../../../domain/ports/out/database/patients-repository.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type GetPatientServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  patientsRepository: PatientsRepository<TxCtx>;
  cache?: Cache;
};

export class GetPatientService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements GetPatientUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly patientsRepository: PatientsRepository<TxCtx>;
  private readonly cache?: Cache;

  constructor(deps: GetPatientServiceDeps<TxCtx>) {
    super(GET_PATIENT_USE_CASE);

    this.db = deps.db;
    this.patientsRepository = deps.patientsRepository;
    this.cache = deps.cache;
  }

  async getPatient(input: GetPatientInput): Promise<GetPatientOutput> {
    const cacheKey = `${cacheNamespaces.PATIENTS}:${input.id}`;

    if (this.cache) {
      const cached = await this.cache.get(cacheKey);
      if (cached) {
        try {
          return JSON.parse(cached) as GetPatientOutput;
        } catch {
          this.log.warn({ cacheKey }, "Corrupted cache entry, ignoring");
        }
      }
    }

    const patient = await this.db.beginTx(
      (ctx) => this.patientsRepository.getById(ctx, input.id),
      READ_ONLY_DB_TX,
    );

    if (!patient) {
      throw new NotFoundError(`Patient '${input.id}' not found`);
    }

    if (this.cache) {
      await this.cache.set(cacheKey, JSON.stringify(patient));
    }

    return patient;
  }
}
