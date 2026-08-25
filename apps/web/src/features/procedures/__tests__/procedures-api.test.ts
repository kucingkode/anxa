import { describe, expect, it, vi } from "vitest";
import { api } from "@/lib/api";
import {
  createProcedure,
  deleteProcedure,
  getProcedure,
  listProcedures,
  updateProcedure,
} from "../api/procedures";

vi.mock("@/lib/api", () => ({
  api: {
    GET: vi.fn(),
    POST: vi.fn(),
    PATCH: vi.fn(),
    DELETE: vi.fn(),
  },
}));

describe("procedures api", () => {
  it("listProcedures returns data", async () => {
    vi.mocked(api.GET).mockResolvedValue({ data: [], response: new Response() } as never);
    const result = await listProcedures();
    expect(result).toEqual([]);
    expect(api.GET).toHaveBeenCalledWith("/v1/procedures", {
      params: { query: { limit: undefined, patientId: undefined, visitId: undefined } },
    });
  });

  it("listProcedures forwards filters", async () => {
    vi.mocked(api.GET).mockResolvedValue({ data: [], response: new Response() } as never);
    await listProcedures({ patientId: "p1", visitId: "v1" });
    expect(api.GET).toHaveBeenCalledWith("/v1/procedures", {
      params: { query: { limit: undefined, patientId: "p1", visitId: "v1" } },
    });
  });

  it("listProcedures throws on error", async () => {
    vi.mocked(api.GET).mockResolvedValue({
      error: { message: "Unauthorized", statusCode: 401, error: "Unauthorized" },
      response: new Response(),
    } as never);
    await expect(listProcedures()).rejects.toThrow("Unauthorized");
  });

  it("createProcedure posts and returns procedure", async () => {
    const procedure = {
      id: "1",
      patientId: "p1",
      visitId: "v1",
      code: "00.01",
      createdAt: "",
      updatedAt: "",
    };
    vi.mocked(api.POST).mockResolvedValue({ data: procedure, response: new Response() } as never);
    const result = await createProcedure({ patientId: "p1", visitId: "v1", code: "00.01" });
    expect(result).toEqual(procedure);
  });

  it("getProcedure fetches by id", async () => {
    vi.mocked(api.GET).mockResolvedValue({ data: { id: "1" }, response: new Response() } as never);
    await getProcedure("1");
    expect(api.GET).toHaveBeenCalledWith("/v1/procedures/{procedureId}", {
      params: { path: { procedureId: "1" } },
    });
  });

  it("updateProcedure patches by id", async () => {
    vi.mocked(api.PATCH).mockResolvedValue({ data: { id: "1" }, response: new Response() } as never);
    await updateProcedure("1", { status: "completed" });
    expect(api.PATCH).toHaveBeenCalledWith(
      "/v1/procedures/{procedureId}",
      { params: { path: { procedureId: "1" } }, body: { status: "completed" } },
    );
  });

  it("deleteProcedure deletes by id", async () => {
    vi.mocked(api.DELETE).mockResolvedValue({ data: undefined, response: new Response() } as never);
    await deleteProcedure("1");
    expect(api.DELETE).toHaveBeenCalledWith("/v1/procedures/{procedureId}", {
      params: { path: { procedureId: "1" } },
    });
  });
});
