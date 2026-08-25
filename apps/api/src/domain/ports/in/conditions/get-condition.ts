import type { Condition } from "@simk/contracts";

export type GetConditionInput = {
  id: string;
};

export type GetConditionOutput = Condition;

export type GetConditionUseCase = {
  getCondition(input: GetConditionInput): Promise<GetConditionOutput>;
};
