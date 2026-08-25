import type { ProcedureReference, UpdateProcedureReference } from "@simk/contracts";

export type UpdateProcedureReferenceInput = {
  id: string;
  changes: UpdateProcedureReference;
};

export type UpdateProcedureReferenceOutput = ProcedureReference;

export type UpdateProcedureReferenceUseCase = {
  updateProcedureReference(input: UpdateProcedureReferenceInput): Promise<UpdateProcedureReferenceOutput>;
};