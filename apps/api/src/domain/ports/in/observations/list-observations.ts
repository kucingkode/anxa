import type { Observation } from "@simk/contracts";

export type ListObservationsInput = {
  limit?: number;
  offset?: number;
  patientId?: string;
  visitId?: string;
  status?: Observation["status"];
};

export type ListObservationsOutput = Observation[];

export type ListObservationsUseCase = {
  listObservations(input: ListObservationsInput): Promise<ListObservationsOutput>;
};
