import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/errors";
import type { NewPatient, Patient, UpdatePatient } from "@simk/contracts";

export interface ListPatientsParams {
  query?: string;
  limit?: number;
  offset?: number;
}

export async function listPatients(params: ListPatientsParams = {}): Promise<Patient[]> {
  const { data, error } = await api.GET("/v1/patients", {
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

export async function getPatient(id: string): Promise<Patient> {
  const { data, error } = await api.GET("/v1/patients/{patientId}", {
    params: { path: { patientId: id } },
  });
  if (error) throw new Error(getErrorMessage(error));
  return data as Patient;
}

export async function createPatient(payload: NewPatient): Promise<Patient> {
  const { data, error } = await api.POST("/v1/patients", { body: payload });
  if (error) throw new Error(getErrorMessage(error));
  return data as Patient;
}

export async function updatePatient(id: string, payload: UpdatePatient): Promise<Patient> {
  const { data, error } = await api.PATCH("/v1/patients/{patientId}", {
    params: { path: { patientId: id } },
    body: payload,
  });
  if (error) throw new Error(getErrorMessage(error));
  return data as Patient;
}

export async function deletePatient(id: string): Promise<void> {
  const { error } = await api.DELETE("/v1/patients/{patientId}", {
    params: { path: { patientId: id } },
  });
  if (error) throw new Error(getErrorMessage(error));
}
