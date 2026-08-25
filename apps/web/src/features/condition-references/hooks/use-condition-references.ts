import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createConditionReference,
  deleteConditionReference,
  getConditionReference,
  listConditionReferences,
  updateConditionReference,
  type ListConditionReferencesParams,
} from "../api/condition-references";
import type { NewConditionReference, UpdateConditionReference } from "@simk/contracts";

export const conditionReferencesKey = ["condition-references"] as const;

export function useConditionReferences(params: ListConditionReferencesParams = {}) {
  return useQuery({
    queryKey: [...conditionReferencesKey, params],
    queryFn: () => listConditionReferences(params),
  });
}

export function useConditionReference(id: string) {
  return useQuery({
    queryKey: [...conditionReferencesKey, id],
    queryFn: () => getConditionReference(id),
    enabled: Boolean(id),
  });
}

export function useCreateConditionReference() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: NewConditionReference) => createConditionReference(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: conditionReferencesKey }),
  });
}

export function useUpdateConditionReference() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateConditionReference }) =>
      updateConditionReference(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: conditionReferencesKey }),
  });
}

export function useDeleteConditionReference() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteConditionReference(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: conditionReferencesKey }),
  });
}
