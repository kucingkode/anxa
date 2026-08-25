import { CREATE_PATIENT_USE_CASE, READ_ONLY_DB_TX } from "../../../constants.js";
import { AlreadyExistsError } from "../../../domain/errors/domain/already-exists-error.js";
import type {
  CreatePatientInput,
  CreatePatientOutput,
  CreatePatientUseCase,
} from "../../../domain/ports/in/patients/create-patient.js";
import type {
  Database,
  TxContext,
} from "../../../domain/ports/out/database/database.js";
import type { PatientsRepository } from "../../../domain/ports/out/database/patients-repository.js";
import type { SatuSehat } from "../../../domain/ports/out/satuSehat.js";
import { BaseUseCase } from "../../../shared/classes/base-use-case.js";

export type CreatePatientServiceDeps<TxCtx extends TxContext<any>> = {
  db: Database<TxCtx>;
  patientsRepository: PatientsRepository<TxCtx>;
  satuSehat?: SatuSehat;
};

export class CreatePatientService<TxCtx extends TxContext<any>>
  extends BaseUseCase
  implements CreatePatientUseCase
{
  private readonly db: Database<TxCtx>;
  private readonly patientsRepository: PatientsRepository<TxCtx>;
  private readonly satuSehat?: SatuSehat;

  constructor(deps: CreatePatientServiceDeps<TxCtx>) {
    super(CREATE_PATIENT_USE_CASE);

    this.db = deps.db;
    this.patientsRepository = deps.patientsRepository;
    this.satuSehat = deps.satuSehat;
  }

  async createPatient(input: CreatePatientInput): Promise<CreatePatientOutput> {
    const existing = await this.db.beginTx(
      (ctx) => this.patientsRepository.findByIdentifier(ctx, input.identifier),
      READ_ONLY_DB_TX,
    );

    if (existing) {
      this.log.warn(
        { identifier: input.identifier },
        "Duplicate patient identifier",
      );
      throw new AlreadyExistsError(
        `Patient with identifier '${input.identifier}' already exists`,
      );
    }

    const patient = await this.db.beginTx((ctx) =>
      this.patientsRepository.create(ctx, input),
    );

    this.log.info({ patientId: patient.id }, "Patient created");

    if (this.satuSehat?.enabled) {
      try {
        const ihs = await this.satuSehat.createPatient(patient);
        this.log.info({ patientId: patient.id, ihs }, "Submitted to SatuSehat");
      } catch (err) {
        this.log.error(
          { err, patientId: patient.id },
          "SatuSehat submission failed",
        );
      }
    }

    return patient;
  }
}
