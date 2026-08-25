import type { NewObservation, Observation } from "@simk/contracts";

export type CreateObservationInput = NewObservation;
export type CreateObservationOutput = Observation;

export type CreateObservationUseCase = {
  createObservation(
    input: CreateObservationInput,
  ): Promise<CreateObservationOutput>;
};
