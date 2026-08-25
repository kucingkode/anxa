import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/errors";
import type { NewRole, Role, UpdateRole } from "@simk/contracts";

export interface ListRolesParams {
  query?: string;
  limit?: number;
  offset?: number;
}

export async function listRoles(params: ListRolesParams = {}): Promise<Role[]> {
  const { data, error } = await api.GET("/v1/roles", {
    params: {
      query: {
        query: params.query || undefined,
        limit: params.limit || undefined,
        offset: params.offset || undefined,
      },
    },
  });
  if (error) throw new Error(getErrorMessage(error));
  return data ?? [];
}

export async function getRole(id: string): Promise<Role> {
  const { data, error } = await api.GET("/v1/roles/{roleId}", {
    params: { path: { roleId: id } },
  });
  if (error) throw new Error(getErrorMessage(error));
  return data as Role;
}

export async function createRole(payload: NewRole): Promise<Role> {
  const { data, error } = await api.POST("/v1/roles", { body: payload });
  if (error) throw new Error(getErrorMessage(error));
  return data as Role;
}

export async function updateRole(id: string, payload: UpdateRole): Promise<Role> {
  const { data, error } = await api.PATCH("/v1/roles/{roleId}", {
    params: { path: { roleId: id } },
    body: payload,
  });
  if (error) throw new Error(getErrorMessage(error));
  return data as Role;
}

export async function deleteRole(id: string): Promise<void> {
  const { error } = await api.DELETE("/v1/roles/{roleId}", {
    params: { path: { roleId: id } },
  });
  if (error) throw new Error(getErrorMessage(error));
}
