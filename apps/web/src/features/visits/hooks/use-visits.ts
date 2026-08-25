import { useQuery } from "@tanstack/react-query";
import { getVisit, listPatientVisits, listVisits } from "../api/visits";
import type { ListVisitsParams } from "../api/visits";

export const visitsKey = ["visits"] as const;

export function useVisits(filters?: ListVisitsParams) {
  return useQuery({
    queryKey: [...visitsKey, filters],
    queryFn: () => listVisits(filters),
  });
}

export function useVisit(id: string) {
  return useQuery({
    queryKey: [...visitsKey, id],
    queryFn: () => getVisit(id),
    enabled: Boolean(id),
  });
}

export function usePatientVisits(patientId: string) {
  return useQuery({
    queryKey: [...visitsKey, "patient", patientId],
    queryFn: () => listPatientVisits(patientId),
    enabled: Boolean(patientId),
  });
}
