import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, deleteUser, getUser, listUsers, updateUser } from "../api/users";
import type { ListUsersParams } from "../api/users";
import type { NewUser, UpdateUser } from "@simk/contracts";

export const usersKey = ["users"] as const;

export function useUsers(filters?: ListUsersParams) {
  return useQuery({
    queryKey: [...usersKey, filters],
    queryFn: () => listUsers(filters),
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: [...usersKey, id],
    queryFn: () => getUser(id),
    enabled: Boolean(id),
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: NewUser) => createUser(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: usersKey }),
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUser }) => updateUser(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: usersKey }),
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: usersKey }),
  });
}
