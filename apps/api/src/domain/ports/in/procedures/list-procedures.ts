import type { Procedure } from "@simk/contracts";

export type ListProceduresInput = {
  limit?: number;
  offset?: number;
  patientId?: string;
  visitId?: string;
};

export type ListProceduresOutput = Procedure[];

export type ListProceduresUseCase = {
  listProcedures(input: ListProceduresInput): Promise<ListProceduresOutput>;
};
