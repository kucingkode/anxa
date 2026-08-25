export type DeleteQueueInput = {
  id: string;
};

export type DeleteQueueOutput = void;

export type DeleteQueueUseCase = {
  deleteQueue(input: DeleteQueueInput): Promise<DeleteQueueOutput>;
};
