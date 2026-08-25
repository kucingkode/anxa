import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/errors";
import type { Condition, NewCondition, UpdateCondition } from "@simk/contracts";

export interface ListConditionsParams {
  limit?: number;
  patientId?: string;
  visitId?: string;
}

export async function listConditions(params?: ListConditionsParams): Promise<Condition[]> {
  const { data, error } = await api.GET("/v1/conditions", {
    params: {
      query: {
        limit: params?.limit,
        patientId: params?.patientId || undefined,
        visitId: params?.visitId || undefined,
      },
    },
  });
  if (error) throw new Error(getErrorMessage(error));
  return data ?? [];
}

export async function createCondition(payload: NewCondition): Promise<Condition> {
  const { data, error } = await api.POST("/v1/conditions", { body: payload });
  if (error) throw new Error(getErrorMessage(error));
  return data as Condition;
}

export async function getCondition(id: string): Promise<Condition> {
  const { data, error } = await api.GET("/v1/conditions/{conditionId}", {
    params: { path: { conditionId: id } },
  });
  if (error) throw new Error(getErrorMessage(error));
  return data as Condition;
}

export async function updateCondition(id: string, payload: UpdateCondition): Promise<Condition> {
  const { data, error } = await api.PATCH("/v1/conditions/{conditionId}", {
    params: { path: { conditionId: id } },
    body: payload,
  });
  if (error) throw new Error(getErrorMessage(error));
  return data as Condition;
}

export async function deleteCondition(id: string): Promise<void> {
  const { error } = await api.DELETE("/v1/conditions/{conditionId}", {
    params: { path: { conditionId: id } },
  });
  if (error) throw new Error(getErrorMessage(error));
}
