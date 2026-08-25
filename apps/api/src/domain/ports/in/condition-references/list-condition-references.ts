import type { ConditionReference } from "@simk/contracts";

export type ListConditionReferencesInput = {
  limit?: number;
  offset?: number;
  query?: string;
};

export type ListConditionReferencesOutput = ConditionReference[];

export type ListConditionReferencesUseCase = {
  listConditionReferences(input: ListConditionReferencesInput): Promise<ListConditionReferencesOutput>;
};