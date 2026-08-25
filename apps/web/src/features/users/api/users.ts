import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/errors";
import type { NewUser, UpdateUser, User } from "@simk/contracts";

export interface ListUsersParams {
  query?: string;
  roleId?: string;
  limit?: number;
  offset?: number;
}

export async function listUsers(params: ListUsersParams = {}): Promise<User[]> {
  const { data, error } = await api.GET("/v1/users", {
    params: {
      query: {
        query: params.query || undefined,
        roleId: params.roleId,
        limit: params.limit || undefined,
        offset: params.offset || undefined,
      },
    },
  });
  if (error) throw new Error(getErrorMessage(error));
  return data ?? [];
}

export async function getUser(id: string): Promise<User> {
  const { data, error } = await api.GET("/v1/users/{userId}", {
    params: { path: { userId: id } },
  });
  if (error) throw new Error(getErrorMessage(error));
  return data as User;
}

export async function createUser(payload: NewUser): Promise<User> {
  const { data, error } = await api.POST("/v1/users", { body: payload });
  if (error) throw new Error(getErrorMessage(error));
  return data as User;
}

export async function updateUser(id: string, payload: UpdateUser): Promise<User> {
  const { data, error } = await api.PATCH("/v1/users/{userId}", {
    params: { path: { userId: id } },
    body: payload,
  });
  if (error) throw new Error(getErrorMessage(error));
  return data as User;
}

export async function deleteUser(id: string): Promise<void> {
  const { error } = await api.DELETE("/v1/users/{userId}", {
    params: { path: { userId: id } },
  });
  if (error) throw new Error(getErrorMessage(error));
}
