import type { Patient } from "@simk/contracts";

export type SatuSehat = {
  readonly enabled: boolean;
  authenticate(): Promise<string>;
  createPatient(patient: Patient): Promise<string>;
};
