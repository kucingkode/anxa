import type { NewPatient, Patient } from "@simk/contracts";

export type CreatePatientInput = NewPatient;
export type CreatePatientOutput = Patient;

export type CreatePatientUseCase = {
  createPatient(input: CreatePatientInput): Promise<CreatePatientOutput>;
};
