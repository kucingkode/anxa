import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProcedureReference,
  deleteProcedureReference,
  getProcedureReference,
  listProcedureReferences,
  updateProcedureReference,
  type ListProcedureReferencesParams,
} from "../api/procedure-references";
import type { NewProcedureReference, UpdateProcedureReference } from "@simk/contracts";

export const procedureReferencesKey = ["procedure-references"] as const;

export function useProcedureReferences(params: ListProcedureReferencesParams = {}) {
  return useQuery({
    queryKey: [...procedureReferencesKey, params],
    queryFn: () => listProcedureReferences(params),
  });
}

export function useProcedureReference(id: string) {
  return useQuery({
    queryKey: [...procedureReferencesKey, id],
    queryFn: () => getProcedureReference(id),
    enabled: Boolean(id),
  });
}

export function useCreateProcedureReference() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: NewProcedureReference) => createProcedureReference(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: procedureReferencesKey }),
  });
}

export function useUpdateProcedureReference() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateProcedureReference }) =>
      updateProcedureReference(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: procedureReferencesKey }),
  });
}

export function useDeleteProcedureReference() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProcedureReference(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: procedureReferencesKey }),
  });
}
