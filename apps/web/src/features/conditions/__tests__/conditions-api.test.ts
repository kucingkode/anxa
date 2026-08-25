import { describe, expect, it, vi } from "vitest";
import { api } from "@/lib/api";
import {
  createCondition,
  deleteCondition,
  getCondition,
  listConditions,
  updateCondition,
} from "../api/conditions";

vi.mock("@/lib/api", () => ({
  api: {
    GET: vi.fn(),
    POST: vi.fn(),
    PATCH: vi.fn(),
    DELETE: vi.fn(),
  },
}));

describe("conditions api", () => {
  it("listConditions returns data", async () => {
    vi.mocked(api.GET).mockResolvedValue({ data: [], response: new Response() } as never);
    const result = await listConditions();
    expect(result).toEqual([]);
    expect(api.GET).toHaveBeenCalledWith("/v1/conditions", {
      params: { query: { limit: undefined, patientId: undefined, visitId: undefined } },
    });
  });

  it("listConditions forwards filters", async () => {
    vi.mocked(api.GET).mockResolvedValue({ data: [], response: new Response() } as never);
    await listConditions({ patientId: "p1", visitId: "v1" });
    expect(api.GET).toHaveBeenCalledWith("/v1/conditions", {
      params: { query: { limit: undefined, patientId: "p1", visitId: "v1" } },
    });
  });

  it("listConditions throws on error", async () => {
    vi.mocked(api.GET).mockResolvedValue({
      error: { message: "Unauthorized", statusCode: 401, error: "Unauthorized" },
      response: new Response(),
    } as never);
    await expect(listConditions()).rejects.toThrow("Unauthorized");
  });

  it("createCondition posts and returns condition", async () => {
    const condition = {
      id: "1",
      patientId: "p1",
      visitId: "v1",
      code: "E11.9",
      createdAt: "",
      updatedAt: "",
    };
    vi.mocked(api.POST).mockResolvedValue({ data: condition, response: new Response() } as never);
    const result = await createCondition({ patientId: "p1", visitId: "v1", code: "E11.9" });
    expect(result).toEqual(condition);
  });

  it("getCondition fetches by id", async () => {
    vi.mocked(api.GET).mockResolvedValue({ data: { id: "1" }, response: new Response() } as never);
    await getCondition("1");
    expect(api.GET).toHaveBeenCalledWith("/v1/conditions/{conditionId}", {
      params: { path: { conditionId: "1" } },
    });
  });

  it("updateCondition patches by id", async () => {
    vi.mocked(api.PATCH).mockResolvedValue({ data: { id: "1" }, response: new Response() } as never);
    await updateCondition("1", { clinicalStatus: "resolved" });
    expect(api.PATCH).toHaveBeenCalledWith(
      "/v1/conditions/{conditionId}",
      { params: { path: { conditionId: "1" } }, body: { clinicalStatus: "resolved" } },
    );
  });

  it("deleteCondition deletes by id", async () => {
    vi.mocked(api.DELETE).mockResolvedValue({ data: undefined, response: new Response() } as never);
    await deleteCondition("1");
    expect(api.DELETE).toHaveBeenCalledWith("/v1/conditions/{conditionId}", {
      params: { path: { conditionId: "1" } },
    });
  });
});
