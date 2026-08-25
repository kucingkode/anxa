import type { Procedure, UpdateProcedure } from "@simk/contracts";

export type UpdateProcedureInput = {
  id: string;
  changes: UpdateProcedure;
};

export type UpdateProcedureOutput = Procedure;

export type UpdateProcedureUseCase = {
  updateProcedure(input: UpdateProcedureInput): Promise<UpdateProcedureOutput>;
};
