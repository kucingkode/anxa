import type { Queue } from "@simk/contracts";

export type UpdateQueueInput = {
  id: string;
  status: Queue["status"];
  expectedVersion: number;
};

export type UpdateQueueOutput = Queue;

export type UpdateQueueUseCase = {
  updateQueue(input: UpdateQueueInput): Promise<UpdateQueueOutput>;
};
