import type { ProcedureReference } from "@simk/contracts";

export type GetProcedureReferenceInput = {
  id: string;
};

export type GetProcedureReferenceOutput = ProcedureReference;

export type GetProcedureReferenceUseCase = {
  getProcedureReference(input: GetProcedureReferenceInput): Promise<GetProcedureReferenceOutput>;
};