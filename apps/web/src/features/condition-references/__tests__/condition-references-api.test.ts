import { describe, expect, it, vi } from "vitest";
import { api } from "@/lib/api";
import {
  createConditionReference,
  deleteConditionReference,
  getConditionReference,
  listConditionReferences,
  updateConditionReference,
} from "../api/condition-references";

vi.mock("@/lib/api", () => ({
  api: {
    GET: vi.fn(),
    POST: vi.fn(),
    PATCH: vi.fn(),
    DELETE: vi.fn(),
  },
}));

describe("condition-references api", () => {
  it("listConditionReferences returns data", async () => {
    vi.mocked(api.GET).mockResolvedValue({ data: [], response: new Response() } as never);
    const result = await listConditionReferences();
    expect(result).toEqual([]);
    expect(api.GET).toHaveBeenCalledWith("/v1/condition-references", {
      params: { query: { query: undefined } },
    });
  });

  it("listConditionReferences throws on error", async () => {
    vi.mocked(api.GET).mockResolvedValue({
      error: { message: "Unauthorized", statusCode: 401, error: "Unauthorized" },
      response: new Response(),
    } as never);
    await expect(listConditionReferences()).rejects.toThrow("Unauthorized");
  });

  it("createConditionReference posts and returns reference", async () => {
    const reference = { id: "1", code: "A00", display: "Kolera", createdAt: "", updatedAt: "" };
    vi.mocked(api.POST).mockResolvedValue({ data: reference, response: new Response() } as never);
    const result = await createConditionReference({ code: "A00", display: "Kolera" });
    expect(result).toEqual(reference);
  });

  it("getConditionReference fetches by id", async () => {
    vi.mocked(api.GET).mockResolvedValue({ data: { id: "1" }, response: new Response() } as never);
    await getConditionReference("1");
    expect(api.GET).toHaveBeenCalledWith("/v1/condition-references/{conditionReferenceId}", {
      params: { path: { conditionReferenceId: "1" } },
    });
  });

  it("updateConditionReference patches by id", async () => {
    vi.mocked(api.PATCH).mockResolvedValue({ data: { id: "1" }, response: new Response() } as never);
    await updateConditionReference("1", { display: "Kolera Baru" });
    expect(api.PATCH).toHaveBeenCalledWith(
      "/v1/condition-references/{conditionReferenceId}",
      { params: { path: { conditionReferenceId: "1" } }, body: { display: "Kolera Baru" } },
    );
  });

  it("deleteConditionReference deletes by id", async () => {
    vi.mocked(api.DELETE).mockResolvedValue({ data: undefined, response: new Response() } as never);
    await deleteConditionReference("1");
    expect(api.DELETE).toHaveBeenCalledWith("/v1/condition-references/{conditionReferenceId}", {
      params: { path: { conditionReferenceId: "1" } },
    });
  });
});
