import type { Condition } from "@simk/contracts";

export type ListConditionsInput = {
  limit?: number;
  offset?: number;
  patientId?: string;
  visitId?: string;
};

export type ListConditionsOutput = Condition[];

export type ListConditionsUseCase = {
  listConditions(input: ListConditionsInput): Promise<ListConditionsOutput>;
};
