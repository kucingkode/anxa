import type { Queue } from "@simk/contracts";

export type ListQueuesInput = {
  limit?: number;
  offset?: number;
  patientId?: string;
  status?: Queue["status"];
};

export type ListQueuesOutput = Queue[];

export type ListQueuesUseCase = {
  listQueues(input: ListQueuesInput): Promise<ListQueuesOutput>;
};
