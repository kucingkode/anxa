import type { Observation } from "@simk/contracts";

export type GetObservationInput = {
  id: string;
};

export type GetObservationOutput = Observation;

export type GetObservationUseCase = {
  getObservation(input: GetObservationInput): Promise<GetObservationOutput>;
};
