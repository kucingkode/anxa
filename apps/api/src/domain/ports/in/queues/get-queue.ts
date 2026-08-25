import type { Queue } from "@simk/contracts";

export type GetQueueInput = {
  id: string;
};

export type GetQueueOutput = Queue;

export type GetQueueUseCase = {
  getQueue(input: GetQueueInput): Promise<GetQueueOutput>;
};
