import type { ProcedureReference } from "@simk/contracts";

export type ListProcedureReferencesInput = {
  limit?: number;
  offset?: number;
  query?: string;
};

export type ListProcedureReferencesOutput = ProcedureReference[];

export type ListProcedureReferencesUseCase = {
  listProcedureReferences(input: ListProcedureReferencesInput): Promise<ListProcedureReferencesOutput>;
};