import type { Patient } from "@simk/contracts";

export type ListPatientsInput = {
  limit?: number;
  offset?: number;
  query?: string;
};

export type ListPatientsOutput = Patient[];

export type ListPatientsUseCase = {
  listPatients(input: ListPatientsInput): Promise<ListPatientsOutput>;
};
