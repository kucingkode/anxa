import { describe, expect, it, vi } from "vitest";
import { api } from "@/lib/api";
import {
  createFollowUpVisit,
  getFollowUpVisit,
  listFollowUpVisits,
  updateFollowUpVisit,
} from "../api/follow-up-visits";

vi.mock("@/lib/api", () => ({
  api: {
    GET: vi.fn(),
    POST: vi.fn(),
    PATCH: vi.fn(),
    DELETE: vi.fn(),
  },
}));

describe("follow-up-visits api", () => {
  it("listFollowUpVisits returns data", async () => {
    vi.mocked(api.GET).mockResolvedValue({ data: [], response: new Response() } as never);
    const result = await listFollowUpVisits();
    expect(result).toEqual([]);
    expect(api.GET).toHaveBeenCalledWith("/v1/follow-up-visits", {
      params: { query: { limit: undefined, patientId: undefined, status: undefined, date: undefined } },
    });
  });

  it("listFollowUpVisits throws on error", async () => {
    vi.mocked(api.GET).mockResolvedValue({
      error: { message: "Unauthorized", statusCode: 401, error: "Unauthorized" },
      response: new Response(),
    } as never);
    await expect(listFollowUpVisits()).rejects.toThrow("Unauthorized");
  });

  it("createFollowUpVisit posts and returns follow-up visit", async () => {
    const followUp = {
      id: "1",
      patientId: "p1",
      date: "2026-01-01T00:00:00Z",
      status: "booked",
      createdAt: "",
      updatedAt: "",
    };
    vi.mocked(api.POST).mockResolvedValue({ data: followUp, response: new Response() } as never);
    const result = await createFollowUpVisit({ patientId: "p1", date: "2026-01-01T00:00:00Z" });
    expect(result).toEqual(followUp);
  });

  it("getFollowUpVisit fetches by id", async () => {
    vi.mocked(api.GET).mockResolvedValue({ data: { id: "1" }, response: new Response() } as never);
    await getFollowUpVisit("1");
    expect(api.GET).toHaveBeenCalledWith("/v1/follow-up-visits/{followUpVisitId}", {
      params: { path: { followUpVisitId: "1" } },
    });
  });

  it("updateFollowUpVisit patches by id", async () => {
    vi.mocked(api.PATCH).mockResolvedValue({ data: { id: "1" }, response: new Response() } as never);
    await updateFollowUpVisit("1", { status: "arrived" });
    expect(api.PATCH).toHaveBeenCalledWith(
      "/v1/follow-up-visits/{followUpVisitId}",
      { params: { path: { followUpVisitId: "1" } }, body: { status: "arrived" } },
    );
  });
});
