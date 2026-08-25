import { describe, expect, it, vi } from "vitest";
import { api } from "@/lib/api";
import { createPatient, deletePatient, getPatient, listPatients, updatePatient } from "../api/patients";

vi.mock("@/lib/api", () => ({
  api: {
    GET: vi.fn(),
    POST: vi.fn(),
    PATCH: vi.fn(),
    DELETE: vi.fn(),
  },
}));

describe("patients api", () => {
  it("listPatients returns data", async () => {
    vi.mocked(api.GET).mockResolvedValue({ data: [], response: new Response() } as never);
    const result = await listPatients();
    expect(result).toEqual([]);
    expect(api.GET).toHaveBeenCalledWith("/v1/patients", { params: { query: { query: undefined } } });
  });

  it("listPatients throws on error", async () => {
    vi.mocked(api.GET).mockResolvedValue({
      error: { message: "Unauthorized", statusCode: 401, error: "Unauthorized" },
      response: new Response(),
    } as never);
    await expect(listPatients()).rejects.toThrow("Unauthorized");
  });

  it("createPatient posts and returns patient", async () => {
    const patient = { id: "1", name: "Budi", identifier: "123", gender: "male", createdAt: "" };
    vi.mocked(api.POST).mockResolvedValue({ data: patient, response: new Response() } as never);
    const result = await createPatient({ name: "Budi", identifier: "123", gender: "male" });
    expect(result).toEqual(patient);
  });

  it("getPatient fetches by id", async () => {
    vi.mocked(api.GET).mockResolvedValue({ data: { id: "1" }, response: new Response() } as never);
    await getPatient("1");
    expect(api.GET).toHaveBeenCalledWith("/v1/patients/{patientId}", { params: { path: { patientId: "1" } } });
  });

  it("updatePatient patches by id", async () => {
    vi.mocked(api.PATCH).mockResolvedValue({ data: { id: "1" }, response: new Response() } as never);
    await updatePatient("1", { name: "Budi Baru" });
    expect(api.PATCH).toHaveBeenCalledWith(
      "/v1/patients/{patientId}",
      { params: { path: { patientId: "1" } }, body: { name: "Budi Baru" } },
    );
  });

  it("deletePatient deletes by id", async () => {
    vi.mocked(api.DELETE).mockResolvedValue({ data: undefined, response: new Response() } as never);
    await deletePatient("1");
    expect(api.DELETE).toHaveBeenCalledWith("/v1/patients/{patientId}", { params: { path: { patientId: "1" } } });
  });
});
