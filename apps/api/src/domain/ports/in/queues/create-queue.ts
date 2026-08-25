import type { NewQueue, Queue } from "@simk/contracts";

export type CreateQueueInput = NewQueue;
export type CreateQueueOutput = Queue;

export type CreateQueueUseCase = {
  createQueue(input: CreateQueueInput): Promise<CreateQueueOutput>;
};
