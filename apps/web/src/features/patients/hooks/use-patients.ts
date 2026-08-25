import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPatient, deletePatient, getPatient, listPatients, updatePatient, type ListPatientsParams } from "../api/patients";
import type { NewPatient, UpdatePatient } from "@simk/contracts";

export const patientsKey = ["patients"] as const;

export function usePatients(params: ListPatientsParams = {}) {
  return useQuery({
    queryKey: [...patientsKey, params],
    queryFn: () => listPatients(params),
  });
}

export function usePatient(id: string) {
  return useQuery({
    queryKey: [...patientsKey, id],
    queryFn: () => getPatient(id),
    enabled: Boolean(id),
  });
}

export function useCreatePatient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: NewPatient) => createPatient(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: patientsKey }),
  });
}

export function useUpdatePatient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdatePatient }) => updatePatient(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: patientsKey }),
  });
}

export function useDeletePatient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePatient(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: patientsKey }),
  });
}
