import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProcedure,
  deleteProcedure,
  getProcedure,
  listProcedures,
  updateProcedure,
} from "../api/procedures";
import type { ListProceduresParams } from "../api/procedures";
import type { NewProcedure, UpdateProcedure } from "@simk/contracts";

export const proceduresKey = ["procedures"] as const;

export function useProcedures(filters?: ListProceduresParams) {
  return useQuery({
    queryKey: [...proceduresKey, filters],
    queryFn: () => listProcedures(filters),
  });
}

export function useProcedure(id: string) {
  return useQuery({
    queryKey: [...proceduresKey, id],
    queryFn: () => getProcedure(id),
    enabled: Boolean(id),
  });
}

export function useCreateProcedure() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: NewProcedure) => createProcedure(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: proceduresKey }),
  });
}

export function useUpdateProcedure() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateProcedure }) =>
      updateProcedure(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: proceduresKey }),
  });
}

export function useDeleteProcedure() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProcedure(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: proceduresKey }),
  });
}
