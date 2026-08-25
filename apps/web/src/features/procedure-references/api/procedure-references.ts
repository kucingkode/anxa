import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/errors";
import type { NewProcedureReference, ProcedureReference, UpdateProcedureReference } from "@simk/contracts";

export interface ListProcedureReferencesParams {
  query?: string;
  limit?: number;
  offset?: number;
}

export async function listProcedureReferences(params: ListProcedureReferencesParams = {}): Promise<ProcedureReference[]> {
  const { data, error } = await api.GET("/v1/procedure-references", {
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

export async function getProcedureReference(id: string): Promise<ProcedureReference> {
  const { data, error } = await api.GET("/v1/procedure-references/{procedureReferenceId}", {
    params: { path: { procedureReferenceId: id } },
  });
  if (error) throw new Error(getErrorMessage(error));
  return data as ProcedureReference;
}

export async function createProcedureReference(payload: NewProcedureReference): Promise<ProcedureReference> {
  const { data, error } = await api.POST("/v1/procedure-references", { body: payload });
  if (error) throw new Error(getErrorMessage(error));
  return data as ProcedureReference;
}

export async function updateProcedureReference(
  id: string,
  payload: UpdateProcedureReference,
): Promise<ProcedureReference> {
  const { data, error } = await api.PATCH("/v1/procedure-references/{procedureReferenceId}", {
    params: { path: { procedureReferenceId: id } },
    body: payload,
  });
  if (error) throw new Error(getErrorMessage(error));
  return data as ProcedureReference;
}

export async function deleteProcedureReference(id: string): Promise<void> {
  const { error } = await api.DELETE("/v1/procedure-references/{procedureReferenceId}", {
    params: { path: { procedureReferenceId: id } },
  });
  if (error) throw new Error(getErrorMessage(error));
}
