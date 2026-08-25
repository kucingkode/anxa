import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/errors";
import type { NewProcedure, Procedure, UpdateProcedure } from "@simk/contracts";

export interface ListProceduresParams {
  limit?: number;
  patientId?: string;
  visitId?: string;
}

export async function listProcedures(params?: ListProceduresParams): Promise<Procedure[]> {
  const { data, error } = await api.GET("/v1/procedures", {
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

export async function createProcedure(payload: NewProcedure): Promise<Procedure> {
  const { data, error } = await api.POST("/v1/procedures", { body: payload });
  if (error) throw new Error(getErrorMessage(error));
  return data as Procedure;
}

export async function getProcedure(id: string): Promise<Procedure> {
  const { data, error } = await api.GET("/v1/procedures/{procedureId}", {
    params: { path: { procedureId: id } },
  });
  if (error) throw new Error(getErrorMessage(error));
  return data as Procedure;
}

export async function updateProcedure(id: string, payload: UpdateProcedure): Promise<Procedure> {
  const { data, error } = await api.PATCH("/v1/procedures/{procedureId}", {
    params: { path: { procedureId: id } },
    body: payload,
  });
  if (error) throw new Error(getErrorMessage(error));
  return data as Procedure;
}

export async function deleteProcedure(id: string): Promise<void> {
  const { error } = await api.DELETE("/v1/procedures/{procedureId}", {
    params: { path: { procedureId: id } },
  });
  if (error) throw new Error(getErrorMessage(error));
}
