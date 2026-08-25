export type DeleteConditionInput = {
  id: string;
};

export type DeleteConditionOutput = void;

export type DeleteConditionUseCase = {
  deleteCondition(input: DeleteConditionInput): Promise<DeleteConditionOutput>;
};
