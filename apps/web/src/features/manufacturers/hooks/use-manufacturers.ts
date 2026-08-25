import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createManufacturer,
  deleteManufacturer,
  getManufacturer,
  listManufacturers,
  updateManufacturer,
  type ListManufacturersParams,
} from "../api/manufacturers";
import type { NewManufacturer, UpdateManufacturer } from "@simk/contracts";

export const manufacturersKey = ["manufacturers"] as const;

export function useManufacturers(params: ListManufacturersParams = {}) {
  return useQuery({
    queryKey: [...manufacturersKey, params],
    queryFn: () => listManufacturers(params),
  });
}

export function useManufacturer(id: string) {
  return useQuery({
    queryKey: [...manufacturersKey, id],
    queryFn: () => getManufacturer(id),
    enabled: Boolean(id),
  });
}

export function useCreateManufacturer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: NewManufacturer) => createManufacturer(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: manufacturersKey }),
  });
}

export function useUpdateManufacturer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateManufacturer }) =>
      updateManufacturer(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: manufacturersKey }),
  });
}

export function useDeleteManufacturer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteManufacturer(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: manufacturersKey }),
  });
}
