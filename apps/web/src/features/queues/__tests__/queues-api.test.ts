import { describe, expect, it, vi } from "vitest";
import { api } from "@/lib/api";
import { createQueue, deleteQueue, getQueue, listQueues, updateQueue } from "../api/queues";

vi.mock("@/lib/api", () => ({
  api: {
    GET: vi.fn(),
    POST: vi.fn(),
    PATCH: vi.fn(),
    DELETE: vi.fn(),
  },
}));

describe("queues api", () => {
  it("listQueues returns data", async () => {
    vi.mocked(api.GET).mockResolvedValue({ data: [], response: new Response() } as never);
    const result = await listQueues();
    expect(result).toEqual([]);
    expect(api.GET).toHaveBeenCalledWith("/v1/queues", {
      params: { query: { patientId: undefined, status: undefined } },
    });
  });

  it("listQueues forwards filters", async () => {
    vi.mocked(api.GET).mockResolvedValue({ data: [], response: new Response() } as never);
    await listQueues({ patientId: "p1", status: "waiting" });
    expect(api.GET).toHaveBeenCalledWith("/v1/queues", {
      params: { query: { patientId: "p1", status: "waiting" } },
    });
  });

  it("listQueues throws on error", async () => {
    vi.mocked(api.GET).mockResolvedValue({
      error: { message: "Unauthorized", statusCode: 401, error: "Unauthorized" },
      response: new Response(),
    } as never);
    await expect(listQueues()).rejects.toThrow("Unauthorized");
  });

  it("createQueue posts and returns queue", async () => {
    const queue = { id: "1", patientId: "p1", status: "waiting", version: 1, createdAt: "", updatedAt: "" };
    vi.mocked(api.POST).mockResolvedValue({ data: queue, response: new Response() } as never);
    const result = await createQueue({ patientId: "p1" });
    expect(result).toEqual(queue);
    expect(api.POST).toHaveBeenCalledWith("/v1/queues", { body: { patientId: "p1" } });
  });

  it("getQueue fetches by id", async () => {
    vi.mocked(api.GET).mockResolvedValue({ data: { id: "1" }, response: new Response() } as never);
    await getQueue("1");
    expect(api.GET).toHaveBeenCalledWith("/v1/queues/{queueId}", { params: { path: { queueId: "1" } } });
  });

  it("updateQueue patches by id with If-Match header", async () => {
    vi.mocked(api.PATCH).mockResolvedValue({ data: { id: "1" }, response: new Response() } as never);
    await updateQueue("1", 3, { status: "in-service" });
    expect(api.PATCH).toHaveBeenCalledWith("/v1/queues/{queueId}", {
      params: { path: { queueId: "1" }, header: { "If-Match": "3" } },
      body: { status: "in-service" },
    });
  });

  it("deleteQueue deletes by id", async () => {
    vi.mocked(api.DELETE).mockResolvedValue({ data: undefined, response: new Response() } as never);
    await deleteQueue("1");
    expect(api.DELETE).toHaveBeenCalledWith("/v1/queues/{queueId}", { params: { path: { queueId: "1" } } });
  });

  it("preserves the 412 status code on optimistic-lock conflicts", async () => {
    vi.mocked(api.PATCH).mockResolvedValue({
      error: { message: "Version mismatch", statusCode: 412, error: "Precondition Failed" },
      response: new Response(null, { status: 412 }),
    } as never);

    await expect(updateQueue("1", 0, { status: "in-service" })).rejects.toMatchObject({
      statusCode: 412,
    });
  });
});
