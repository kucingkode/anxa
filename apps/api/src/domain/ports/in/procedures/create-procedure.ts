import type { NewProcedure, Procedure } from "@simk/contracts";

export type CreateProcedureInput = NewProcedure;
export type CreateProcedureOutput = Procedure;

export type CreateProcedureUseCase = {
  createProcedure(input: CreateProcedureInput): Promise<CreateProcedureOutput>;
};
