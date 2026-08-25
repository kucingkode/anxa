import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCondition,
  deleteCondition,
  getCondition,
  listConditions,
  updateCondition,
} from "../api/conditions";
import type { ListConditionsParams } from "../api/conditions";
import type { NewCondition, UpdateCondition } from "@simk/contracts";

export const conditionsKey = ["conditions"] as const;

export function useConditions(filters?: ListConditionsParams) {
  return useQuery({
    queryKey: [...conditionsKey, filters],
    queryFn: () => listConditions(filters),
  });
}

export function useCondition(id: string) {
  return useQuery({
    queryKey: [...conditionsKey, id],
    queryFn: () => getCondition(id),
    enabled: Boolean(id),
  });
}

export function useCreateCondition() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: NewCondition) => createCondition(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: conditionsKey }),
  });
}

export function useUpdateCondition() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateCondition }) =>
      updateCondition(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: conditionsKey }),
  });
}

export function useDeleteCondition() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCondition(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: conditionsKey }),
  });
}
