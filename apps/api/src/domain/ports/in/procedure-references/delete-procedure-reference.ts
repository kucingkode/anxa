export type DeleteProcedureReferenceInput = {
  id: string;
};

export type DeleteProcedureReferenceOutput = void;

export type DeleteProcedureReferenceUseCase = {
  deleteProcedureReference(input: DeleteProcedureReferenceInput): Promise<DeleteProcedureReferenceOutput>;
};