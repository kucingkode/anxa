import { api } from "@/lib/api";
import { ApiError, getErrorMessage } from "@/lib/errors";
import type { NewQueue, Queue, UpdateQueue } from "@simk/contracts";

export interface ListQueuesParams {
  patientId?: string;
  status?: Queue["status"];
  limit?: number;
  offset?: number;
}

export async function listQueues(params: ListQueuesParams = {}): Promise<Queue[]> {
  const { data, error, response } = await api.GET("/v1/queues", {
    params: {
      query: {
        patientId: params.patientId || undefined,
        status: params.status || undefined,
        limit: params.limit || undefined,
        offset: params.offset || undefined,
      },
    },
  });
  if (error) throw new ApiError(getErrorMessage(error), response.status);
  return data ?? [];
}

export async function getQueue(id: string): Promise<Queue> {
  const { data, error, response } = await api.GET("/v1/queues/{queueId}", {
    params: { path: { queueId: id } },
  });
  if (error) throw new ApiError(getErrorMessage(error), response.status);
  return data as Queue;
}

export async function createQueue(payload: NewQueue): Promise<Queue> {
  const { data, error, response } = await api.POST("/v1/queues", { body: payload });
  if (error) throw new ApiError(getErrorMessage(error), response.status);
  return data as Queue;
}

export async function updateQueue(id: string, version: number, payload: UpdateQueue): Promise<Queue> {
  const { data, error, response } = await api.PATCH("/v1/queues/{queueId}", {
    params: {
      path: { queueId: id },
      header: { "If-Match": String(version) },
    },
    body: payload,
  });
  if (error) throw new ApiError(getErrorMessage(error), response.status);
  return data as Queue;
}

export async function deleteQueue(id: string): Promise<void> {
  const { error, response } = await api.DELETE("/v1/queues/{queueId}", {
    params: { path: { queueId: id } },
  });
  if (error) throw new ApiError(getErrorMessage(error), response.status);
}
