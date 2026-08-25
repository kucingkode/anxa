import type { Patient } from "@simk/contracts";

export type GetPatientInput = {
  id: string;
};

export type GetPatientOutput = Patient;

export type GetPatientUseCase = {
  getPatient(input: GetPatientInput): Promise<GetPatientOutput>;
};
