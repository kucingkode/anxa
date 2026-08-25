import type { Observation, UpdateObservation } from "@simk/contracts";

export type UpdateObservationInput = {
  id: string;
  changes: UpdateObservation;
  expectedVersion: number;
};

export type UpdateObservationOutput = Observation;

export type UpdateObservationUseCase = {
  updateObservation(
    input: UpdateObservationInput,
  ): Promise<UpdateObservationOutput>;
};
