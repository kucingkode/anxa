import type { ConditionReference, UpdateConditionReference } from "@simk/contracts";

export type UpdateConditionReferenceInput = {
  id: string;
  changes: UpdateConditionReference;
};

export type UpdateConditionReferenceOutput = ConditionReference;

export type UpdateConditionReferenceUseCase = {
  updateConditionReference(input: UpdateConditionReferenceInput): Promise<UpdateConditionReferenceOutput>;
};