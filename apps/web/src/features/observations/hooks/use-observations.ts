import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createObservation,
  deleteObservation,
  getObservation,
  listObservations,
  updateObservation,
  updateObservationStatus,
} from "../api/observations";
import type { ListObservationsParams } from "../api/observations";
import type { NewObservation, ObservationStatusUpdate, UpdateObservation } from "@simk/contracts";

export const observationsKey = ["observations"] as const;

export function useObservations(filters?: ListObservationsParams) {
  return useQuery({
    queryKey: [...observationsKey, filters],
    queryFn: () => listObservations(filters),
  });
}

export function useObservation(id: string) {
  return useQuery({
    queryKey: [...observationsKey, id],
    queryFn: () => getObservation(id),
    enabled: Boolean(id),
  });
}

export function useCreateObservation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: NewObservation) => createObservation(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: observationsKey }),
  });
}

export function useUpdateObservation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, version, payload }: { id: string; version: number; payload: UpdateObservation }) =>
      updateObservation(id, version, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: observationsKey }),
  });
}

export function useUpdateObservationStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, version, status }: { id: string; version: number; status: ObservationStatusUpdate }) =>
      updateObservationStatus(id, version, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: observationsKey }),
  });
}

export function useDeleteObservation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteObservation(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: observationsKey }),
  });
}
