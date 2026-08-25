import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRole, deleteRole, getRole, listRoles, updateRole } from "../api/roles";
import type { ListRolesParams } from "../api/roles";
import type { NewRole, UpdateRole } from "@simk/contracts";

export const rolesKey = ["roles"] as const;

export function useRoles(params: ListRolesParams = {}) {
  return useQuery({
    queryKey: [...rolesKey, params],
    queryFn: () => listRoles(params),
  });
}

export function useRole(id: string) {
  return useQuery({
    queryKey: [...rolesKey, id],
    queryFn: () => getRole(id),
    enabled: Boolean(id),
  });
}

export function useCreateRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: NewRole) => createRole(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: rolesKey }),
  });
}

export function useUpdateRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateRole }) => updateRole(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: rolesKey }),
  });
}

export function useDeleteRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteRole(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: rolesKey }),
  });
}
