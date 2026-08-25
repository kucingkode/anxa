import type { Procedure } from "@simk/contracts";

export type GetProcedureInput = {
  id: string;
};

export type GetProcedureOutput = Procedure;

export type GetProcedureUseCase = {
  getProcedure(input: GetProcedureInput): Promise<GetProcedureOutput>;
};
