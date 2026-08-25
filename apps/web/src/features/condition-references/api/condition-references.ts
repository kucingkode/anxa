import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/errors";
import type { ConditionReference, NewConditionReference, UpdateConditionReference } from "@simk/contracts";

export interface ListConditionReferencesParams {
  query?: string;
  limit?: number;
  offset?: number;
}

export async function listConditionReferences(params: ListConditionReferencesParams = {}): Promise<ConditionReference[]> {
  const { data, error } = await api.GET("/v1/condition-references", {
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

export async function getConditionReference(id: string): Promise<ConditionReference> {
  const { data, error } = await api.GET("/v1/condition-references/{conditionReferenceId}", {
    params: { path: { conditionReferenceId: id } },
  });
  if (error) throw new Error(getErrorMessage(error));
  return data as ConditionReference;
}

export async function createConditionReference(payload: NewConditionReference): Promise<ConditionReference> {
  const { data, error } = await api.POST("/v1/condition-references", { body: payload });
  if (error) throw new Error(getErrorMessage(error));
  return data as ConditionReference;
}

export async function updateConditionReference(
  id: string,
  payload: UpdateConditionReference,
): Promise<ConditionReference> {
  const { data, error } = await api.PATCH("/v1/condition-references/{conditionReferenceId}", {
    params: { path: { conditionReferenceId: id } },
    body: payload,
  });
  if (error) throw new Error(getErrorMessage(error));
  return data as ConditionReference;
}

export async function deleteConditionReference(id: string): Promise<void> {
  const { error } = await api.DELETE("/v1/condition-references/{conditionReferenceId}", {
    params: { path: { conditionReferenceId: id } },
  });
  if (error) throw new Error(getErrorMessage(error));
}
