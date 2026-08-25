import type { Observation } from "@simk/contracts";

export type UpdateObservationStatusInput = {
  id: string;
  status: Observation["status"];
  expectedVersion: number;
};

export type UpdateObservationStatusOutput = Observation;

export type UpdateObservationStatusUseCase = {
  updateObservationStatus(
    input: UpdateObservationStatusInput,
  ): Promise<UpdateObservationStatusOutput>;
};
