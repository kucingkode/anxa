import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/errors";
import type { Visit } from "@simk/contracts";

export interface ListVisitsParams {
  limit?: number;
  patientId?: string;
  status?: Visit["status"];
}

export async function listVisits(params?: ListVisitsParams): Promise<Visit[]> {
  const { data, error } = await api.GET("/v1/visits", {
    params: {
      query: {
        limit: params?.limit,
        patientId: params?.patientId || undefined,
        status: params?.status || undefined,
      },
    },
  });
  if (error) throw new Error(getErrorMessage(error));
  return data ?? [];
}

export async function getVisit(id: string): Promise<Visit> {
  const { data, error } = await api.GET("/v1/visits/{visitId}", {
    params: { path: { visitId: id } },
  });
  if (error) throw new Error(getErrorMessage(error));
  return data as Visit;
}

export async function listPatientVisits(patientId: string): Promise<Visit[]> {
  const { data, error } = await api.GET("/v1/patients/{patientId}/visits", {
    params: { path: { patientId } },
  });
  if (error) throw new Error(getErrorMessage(error));
  return data ?? [];
}
