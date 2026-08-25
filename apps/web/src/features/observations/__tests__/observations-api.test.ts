import { describe, expect, it, vi } from "vitest";
import { api } from "@/lib/api";
import {
  createObservation,
  deleteObservation,
  getObservation,
  listObservations,
  updateObservation,
  updateObservationStatus,
} from "../api/observations";

vi.mock("@/lib/api", () => ({
  api: {
    GET: vi.fn(),
    POST: vi.fn(),
    PATCH: vi.fn(),
    DELETE: vi.fn(),
  },
}));

describe("observations api", () => {
  it("listObservations returns data", async () => {
    vi.mocked(api.GET).mockResolvedValue({ data: [], response: new Response() } as never);
    const result = await listObservations();
    expect(result).toEqual([]);
    expect(api.GET).toHaveBeenCalledWith("/v1/observations", {
      params: { query: { visitId: undefined, patientId: undefined, status: undefined } },
    });
  });

  it("listObservations forwards filters", async () => {
    vi.mocked(api.GET).mockResolvedValue({ data: [], response: new Response() } as never);
    await listObservations({ visitId: "v1", patientId: "p1", status: "final" });
    expect(api.GET).toHaveBeenCalledWith("/v1/observations", {
      params: { query: { visitId: "v1", patientId: "p1", status: "final" } },
    });
  });

  it("listObservations throws on error", async () => {
    vi.mocked(api.GET).mockResolvedValue({
      error: { message: "Unauthorized", statusCode: 401, error: "Unauthorized" },
      response: new Response(),
    } as never);
    await expect(listObservations()).rejects.toThrow("Unauthorized");
  });

  it("createObservation posts and returns observation", async () => {
    const observation = {
      id: "1",
      patientId: "p1",
      visitId: "v1",
      code: "8867-4",
      value: 120,
      unit: "mmHg",
      status: "preliminary",
      version: 0,
      createdAt: "",
      updatedAt: "",
    };
    vi.mocked(api.POST).mockResolvedValue({ data: observation, response: new Response() } as never);
    const result = await createObservation({ patientId: "p1", visitId: "v1", code: "8867-4", value: 120, unit: "mmHg", status: "preliminary" });
    expect(result).toEqual(observation);
    expect(api.POST).toHaveBeenCalledWith("/v1/observations", {
      body: { patientId: "p1", visitId: "v1", code: "8867-4", value: 120, unit: "mmHg", status: "preliminary" },
    });
  });

  it("getObservation fetches by id", async () => {
    vi.mocked(api.GET).mockResolvedValue({ data: { id: "1" }, response: new Response() } as never);
    await getObservation("1");
    expect(api.GET).toHaveBeenCalledWith("/v1/observations/{observationId}", { params: { path: { observationId: "1" } } });
  });

  it("updateObservation patches by id with If-Match header", async () => {
    vi.mocked(api.PATCH).mockResolvedValue({ data: { id: "1" }, response: new Response() } as never);
    await updateObservation("1", 3, { value: 130, unit: "mmHg" });
    expect(api.PATCH).toHaveBeenCalledWith("/v1/observations/{observationId}", {
      params: { path: { observationId: "1" }, header: { "If-Match": "3" } },
      body: { value: 130, unit: "mmHg" },
    });
  });

  it("updateObservationStatus patches status with If-Match header", async () => {
    vi.mocked(api.PATCH).mockResolvedValue({ data: { id: "1" }, response: new Response() } as never);
    await updateObservationStatus("1", 2, { status: "final" });
    expect(api.PATCH).toHaveBeenCalledWith("/v1/observations/{observationId}/status", {
      params: { path: { observationId: "1" }, header: { "If-Match": "2" } },
      body: { status: "final" },
    });
  });

  it("deleteObservation deletes by id", async () => {
    vi.mocked(api.DELETE).mockResolvedValue({ data: undefined, response: new Response() } as never);
    await deleteObservation("1");
    expect(api.DELETE).toHaveBeenCalledWith("/v1/observations/{observationId}", { params: { path: { observationId: "1" } } });
  });
});
