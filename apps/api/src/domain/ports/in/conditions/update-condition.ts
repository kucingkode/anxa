import type { Condition, UpdateCondition } from "@simk/contracts";

export type UpdateConditionInput = {
  id: string;
  changes: UpdateCondition;
};

export type UpdateConditionOutput = Condition;

export type UpdateConditionUseCase = {
  updateCondition(input: UpdateConditionInput): Promise<UpdateConditionOutput>;
};
