import { api } from "@/lib/api";
import { ApiError, getErrorMessage } from "@/lib/errors";
import type {
  NewObservation,
  Observation,
  ObservationStatusUpdate,
  UpdateObservation,
} from "@simk/contracts";

export interface ListObservationsParams {
  visitId?: string;
  patientId?: string;
  status?: Observation["status"];
}

export async function listObservations(params?: ListObservationsParams): Promise<Observation[]> {
  const { data, error, response } = await api.GET("/v1/observations", {
    params: {
      query: {
        visitId: params?.visitId || undefined,
        patientId: params?.patientId || undefined,
        status: params?.status || undefined,
      },
    },
  });
  if (error) throw new ApiError(getErrorMessage(error), response.status);
  return data ?? [];
}

export async function getObservation(id: string): Promise<Observation> {
  const { data, error, response } = await api.GET("/v1/observations/{observationId}", {
    params: { path: { observationId: id } },
  });
  if (error) throw new ApiError(getErrorMessage(error), response.status);
  return data as Observation;
}

export async function createObservation(payload: NewObservation): Promise<Observation> {
  const { data, error, response } = await api.POST("/v1/observations", { body: payload });
  if (error) throw new ApiError(getErrorMessage(error), response.status);
  return data as Observation;
}

export async function updateObservation(
  id: string,
  version: number,
  payload: UpdateObservation,
): Promise<Observation> {
  const { data, error, response } = await api.PATCH("/v1/observations/{observationId}", {
    params: {
      path: { observationId: id },
      header: { "If-Match": String(version) },
    },
    body: payload,
  });
  if (error) throw new ApiError(getErrorMessage(error), response.status);
  return data as Observation;
}

export async function updateObservationStatus(
  id: string,
  version: number,
  payload: ObservationStatusUpdate,
): Promise<Observation> {
  const { data, error, response } = await api.PATCH("/v1/observations/{observationId}/status", {
    params: {
      path: { observationId: id },
      header: { "If-Match": String(version) },
    },
    body: payload,
  });
  if (error) throw new ApiError(getErrorMessage(error), response.status);
  return data as Observation;
}

export async function deleteObservation(id: string): Promise<void> {
  const { error, response } = await api.DELETE("/v1/observations/{observationId}", {
    params: { path: { observationId: id } },
  });
  if (error) throw new ApiError(getErrorMessage(error), response.status);
}
