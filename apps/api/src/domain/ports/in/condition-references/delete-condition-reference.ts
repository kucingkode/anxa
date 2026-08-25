export type DeleteConditionReferenceInput = {
  id: string;
};

export type DeleteConditionReferenceOutput = void;

export type DeleteConditionReferenceUseCase = {
  deleteConditionReference(input: DeleteConditionReferenceInput): Promise<DeleteConditionReferenceOutput>;
};