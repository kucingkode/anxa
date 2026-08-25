export type DeleteProcedureInput = {
  id: string;
};

export type DeleteProcedureOutput = void;

export type DeleteProcedureUseCase = {
  deleteProcedure(input: DeleteProcedureInput): Promise<DeleteProcedureOutput>;
};
