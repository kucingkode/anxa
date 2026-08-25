import { describe, expect, it, vi } from "vitest";
import { api } from "@/lib/api";
import {
  createProcedureReference,
  deleteProcedureReference,
  getProcedureReference,
  listProcedureReferences,
  updateProcedureReference,
} from "../api/procedure-references";

vi.mock("@/lib/api", () => ({
  api: {
    GET: vi.fn(),
    POST: vi.fn(),
    PATCH: vi.fn(),
    DELETE: vi.fn(),
  },
}));

describe("procedure-references api", () => {
  it("listProcedureReferences returns data", async () => {
    vi.mocked(api.GET).mockResolvedValue({ data: [], response: new Response() } as never);
    const result = await listProcedureReferences();
    expect(result).toEqual([]);
    expect(api.GET).toHaveBeenCalledWith("/v1/procedure-references", {
      params: { query: { query: undefined } },
    });
  });

  it("listProcedureReferences throws on error", async () => {
    vi.mocked(api.GET).mockResolvedValue({
      error: { message: "Unauthorized", statusCode: 401, error: "Unauthorized" },
      response: new Response(),
    } as never);
    await expect(listProcedureReferences()).rejects.toThrow("Unauthorized");
  });

  it("createProcedureReference posts and returns reference", async () => {
    const reference = { id: "1", code: "0FJC0ZZ", display: "Reseksi", createdAt: "", updatedAt: "" };
    vi.mocked(api.POST).mockResolvedValue({ data: reference, response: new Response() } as never);
    const result = await createProcedureReference({ code: "0FJC0ZZ", display: "Reseksi" });
    expect(result).toEqual(reference);
  });

  it("getProcedureReference fetches by id", async () => {
    vi.mocked(api.GET).mockResolvedValue({ data: { id: "1" }, response: new Response() } as never);
    await getProcedureReference("1");
    expect(api.GET).toHaveBeenCalledWith("/v1/procedure-references/{procedureReferenceId}", {
      params: { path: { procedureReferenceId: "1" } },
    });
  });

  it("updateProcedureReference patches by id", async () => {
    vi.mocked(api.PATCH).mockResolvedValue({ data: { id: "1" }, response: new Response() } as never);
    await updateProcedureReference("1", { display: "Reseksi Baru" });
    expect(api.PATCH).toHaveBeenCalledWith(
      "/v1/procedure-references/{procedureReferenceId}",
      { params: { path: { procedureReferenceId: "1" } }, body: { display: "Reseksi Baru" } },
    );
  });

  it("deleteProcedureReference deletes by id", async () => {
    vi.mocked(api.DELETE).mockResolvedValue({ data: undefined, response: new Response() } as never);
    await deleteProcedureReference("1");
    expect(api.DELETE).toHaveBeenCalledWith("/v1/procedure-references/{procedureReferenceId}", {
      params: { path: { procedureReferenceId: "1" } },
    });
  });
});
