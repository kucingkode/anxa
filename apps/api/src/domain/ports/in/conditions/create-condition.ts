import type { NewCondition, Condition } from "@simk/contracts";

export type CreateConditionInput = NewCondition;
export type CreateConditionOutput = Condition;

export type CreateConditionUseCase = {
  createCondition(input: CreateConditionInput): Promise<CreateConditionOutput>;
};
