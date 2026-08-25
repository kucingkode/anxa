import type { ConditionReference } from "@simk/contracts";

export type GetConditionReferenceInput = {
  id: string;
};

export type GetConditionReferenceOutput = ConditionReference;

export type GetConditionReferenceUseCase = {
  getConditionReference(input: GetConditionReferenceInput): Promise<GetConditionReferenceOutput>;
};