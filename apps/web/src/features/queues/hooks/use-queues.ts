import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createQueue, deleteQueue, getQueue, listQueues, updateQueue } from "../api/queues";
import type { ListQueuesParams } from "../api/queues";
import type { NewQueue, UpdateQueue } from "@simk/contracts";

export const queuesKey = ["queues"] as const;

export function useQueues(params: ListQueuesParams = {}) {
  return useQuery({
    queryKey: [...queuesKey, params],
    queryFn: () => listQueues(params),
  });
}

export function useQueue(id: string) {
  return useQuery({
    queryKey: [...queuesKey, id],
    queryFn: () => getQueue(id),
    enabled: Boolean(id),
  });
}

export function useCreateQueue() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: NewQueue) => createQueue(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queuesKey }),
  });
}

export function useUpdateQueue() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, version, payload }: { id: string; version: number; payload: UpdateQueue }) =>
      updateQueue(id, version, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queuesKey }),
  });
}

export function useDeleteQueue() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteQueue(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queuesKey }),
  });
}
