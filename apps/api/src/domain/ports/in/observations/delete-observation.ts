export type DeleteObservationInput = {
  id: string;
};

export type DeleteObservationOutput = void;

export type DeleteObservationUseCase = {
  deleteObservation(input: DeleteObservationInput): Promise<DeleteObservationOutput>;
};
