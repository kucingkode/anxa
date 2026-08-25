import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createFollowUpVisit,
  listFollowUpVisits,
  updateFollowUpVisit,
} from "../api/follow-up-visits";
import type { ListFollowUpVisitsParams } from "../api/follow-up-visits";
import type { NewFollowUpVisit, UpdateFollowUpVisit } from "@simk/contracts";

export const followUpVisitsKey = ["follow-up-visits"] as const;

export function useFollowUpVisits(filters?: ListFollowUpVisitsParams) {
  return useQuery({
    queryKey: [...followUpVisitsKey, filters],
    queryFn: () => listFollowUpVisits(filters),
  });
}

export function useCreateFollowUpVisit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: NewFollowUpVisit) => createFollowUpVisit(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: followUpVisitsKey }),
  });
}

export function useUpdateFollowUpVisit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateFollowUpVisit }) =>
      updateFollowUpVisit(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: followUpVisitsKey }),
  });
}
