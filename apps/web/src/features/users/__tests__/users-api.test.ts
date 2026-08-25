import { describe, expect, it, vi } from "vitest";
import { api } from "@/lib/api";
import { createUser, deleteUser, getUser, listUsers, updateUser } from "../api/users";

vi.mock("@/lib/api", () => ({
  api: {
    GET: vi.fn(),
    POST: vi.fn(),
    PATCH: vi.fn(),
    DELETE: vi.fn(),
  },
}));

describe("users api", () => {
  it("listUsers returns data", async () => {
    vi.mocked(api.GET).mockResolvedValue({ data: [], response: new Response() } as never);
    const result = await listUsers();
    expect(result).toEqual([]);
    expect(api.GET).toHaveBeenCalledWith("/v1/users", {
      params: { query: { query: undefined, roleId: undefined, limit: undefined, offset: undefined } },
    });
  });

  it("listUsers passes query and roleId filters", async () => {
    vi.mocked(api.GET).mockResolvedValue({ data: [], response: new Response() } as never);
    await listUsers({ query: "budi", roleId: "role-1" });
    expect(api.GET).toHaveBeenCalledWith("/v1/users", {
      params: { query: { query: "budi", roleId: "role-1", limit: undefined, offset: undefined } },
    });
  });

  it("listUsers throws on error", async () => {
    vi.mocked(api.GET).mockResolvedValue({
      error: { message: "Unauthorized", statusCode: 401, error: "Unauthorized" },
      response: new Response(),
    } as never);
    await expect(listUsers()).rejects.toThrow("Unauthorized");
  });

  it("createUser posts and returns user", async () => {
    const user = { id: "1", name: "Budi", email: "budi@simk.dev", roleId: "role-1", createdAt: "", updatedAt: "" };
    vi.mocked(api.POST).mockResolvedValue({ data: user, response: new Response() } as never);
    const result = await createUser({ email: "budi@simk.dev", password: "secret", roleId: "role-1" });
    expect(result).toEqual(user);
  });

  it("getUser fetches by id", async () => {
    vi.mocked(api.GET).mockResolvedValue({ data: { id: "1" }, response: new Response() } as never);
    await getUser("1");
    expect(api.GET).toHaveBeenCalledWith("/v1/users/{userId}", { params: { path: { userId: "1" } } });
  });

  it("updateUser patches by id", async () => {
    vi.mocked(api.PATCH).mockResolvedValue({ data: { id: "1" }, response: new Response() } as never);
    await updateUser("1", { name: "Budi Baru" });
    expect(api.PATCH).toHaveBeenCalledWith(
      "/v1/users/{userId}",
      { params: { path: { userId: "1" } }, body: { name: "Budi Baru" } },
    );
  });

  it("deleteUser deletes by id", async () => {
    vi.mocked(api.DELETE).mockResolvedValue({ data: undefined, response: new Response() } as never);
    await deleteUser("1");
    expect(api.DELETE).toHaveBeenCalledWith("/v1/users/{userId}", { params: { path: { userId: "1" } } });
  });
});
