import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/errors";
import type { Manufacturer, NewManufacturer, UpdateManufacturer } from "@simk/contracts";

export interface ListManufacturersParams {
  query?: string;
  limit?: number;
  offset?: number;
}

export async function listManufacturers(params: ListManufacturersParams = {}): Promise<Manufacturer[]> {
  const { data, error } = await api.GET("/v1/manufacturers", {
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

export async function getManufacturer(id: string): Promise<Manufacturer> {
  const { data, error } = await api.GET("/v1/manufacturers/{manufacturerId}", {
    params: { path: { manufacturerId: id } },
  });
  if (error) throw new Error(getErrorMessage(error));
  return data as Manufacturer;
}

export async function createManufacturer(payload: NewManufacturer): Promise<Manufacturer> {
  const { data, error } = await api.POST("/v1/manufacturers", { body: payload });
  if (error) throw new Error(getErrorMessage(error));
  return data as Manufacturer;
}

export async function updateManufacturer(id: string, payload: UpdateManufacturer): Promise<Manufacturer> {
  const { data, error } = await api.PATCH("/v1/manufacturers/{manufacturerId}", {
    params: { path: { manufacturerId: id } },
    body: payload,
  });
  if (error) throw new Error(getErrorMessage(error));
  return data as Manufacturer;
}

export async function deleteManufacturer(id: string): Promise<void> {
  const { error } = await api.DELETE("/v1/manufacturers/{manufacturerId}", {
    params: { path: { manufacturerId: id } },
  });
  if (error) throw new Error(getErrorMessage(error));
}
