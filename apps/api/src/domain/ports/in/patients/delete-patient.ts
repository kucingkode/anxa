export type DeletePatientInput = {
  id: string;
};

export type DeletePatientOutput = void;

export type DeletePatientUseCase = {
  deletePatient(input: DeletePatientInput): Promise<DeletePatientOutput>;
};
