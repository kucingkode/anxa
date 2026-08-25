import type { Visit } from "@simk/contracts";

export type ListVisitsInput = {
  limit?: number;
  offset?: number;
  patientId?: string;
  status?: Visit["status"];
};

export type ListVisitsOutput = Visit[];

export type ListVisitsUseCase = {
  listVisits(input: ListVisitsInput): Promise<ListVisitsOutput>;
};
