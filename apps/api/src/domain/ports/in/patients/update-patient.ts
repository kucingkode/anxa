import type { Patient, UpdatePatient } from "@simk/contracts";

export type UpdatePatientInput = {
  id: string;
  changes: UpdatePatient;
};

export type UpdatePatientOutput = Patient;

export type UpdatePatientUseCase = {
  updatePatient(input: UpdatePatientInput): Promise<UpdatePatientOutput>;
};
