import type { NewConditionReference, ConditionReference } from "@simk/contracts";

export type CreateConditionReferenceInput = NewConditionReference;
export type CreateConditionReferenceOutput = ConditionReference;

export type CreateConditionReferenceUseCase = {
  createConditionReference(input: CreateConditionReferenceInput): Promise<CreateConditionReferenceOutput>;
};