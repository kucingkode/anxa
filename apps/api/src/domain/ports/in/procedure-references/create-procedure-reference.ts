import type { NewProcedureReference, ProcedureReference } from "@simk/contracts";

export type CreateProcedureReferenceInput = NewProcedureReference;
export type CreateProcedureReferenceOutput = ProcedureReference;

export type CreateProcedureReferenceUseCase = {
  createProcedureReference(input: CreateProcedureReferenceInput): Promise<CreateProcedureReferenceOutput>;
};