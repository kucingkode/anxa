import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/errors";
import type { FollowUpVisit, NewFollowUpVisit, UpdateFollowUpVisit } from "@simk/contracts";

export interface ListFollowUpVisitsParams {
  limit?: number;
  patientId?: string;
  status?: FollowUpVisit["status"];
  date?: string;
}

export async function listFollowUpVisits(params?: ListFollowUpVisitsParams): Promise<FollowUpVisit[]> {
  const { data, error } = await api.GET("/v1/follow-up-visits", {
    params: {
      query: {
        limit: params?.limit,
        patientId: params?.patientId || undefined,
        status: params?.status || undefined,
        date: params?.date || undefined,
      },
    },
  });
  if (error) throw new Error(getErrorMessage(error));
  return data ?? [];
}

export async function createFollowUpVisit(payload: NewFollowUpVisit): Promise<FollowUpVisit> {
  const { data, error } = await api.POST("/v1/follow-up-visits", { body: payload });
  if (error) throw new Error(getErrorMessage(error));
  return data as FollowUpVisit;
}

export async function getFollowUpVisit(id: string): Promise<FollowUpVisit> {
  const { data, error } = await api.GET("/v1/follow-up-visits/{followUpVisitId}", {
    params: { path: { followUpVisitId: id } },
  });
  if (error) throw new Error(getErrorMessage(error));
  return data as FollowUpVisit;
}

export async function updateFollowUpVisit(id: string, payload: UpdateFollowUpVisit): Promise<FollowUpVisit> {
  const { data, error } = await api.PATCH("/v1/follow-up-visits/{followUpVisitId}", {
    params: { path: { followUpVisitId: id } },
    body: payload,
  });
  if (error) throw new Error(getErrorMessage(error));
  return data as FollowUpVisit;
}
