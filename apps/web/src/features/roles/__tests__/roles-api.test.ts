import { describe, expect, it, vi } from "vitest";
import { api } from "@/lib/api";
import { createRole, deleteRole, getRole, listRoles, updateRole } from "../api/roles";

vi.mock("@/lib/api", () => ({
  api: {
    GET: vi.fn(),
    POST: vi.fn(),
    PATCH: vi.fn(),
    DELETE: vi.fn(),
  },
}));

describe("roles api", () => {
  it("listRoles returns data", async () => {
    vi.mocked(api.GET).mockResolvedValue({ data: [], response: new Response() } as never);
    const result = await listRoles();
    expect(result).toEqual([]);
    expect(api.GET).toHaveBeenCalledWith("/v1/roles", {
      params: { query: { query: undefined } },
    });
  });

  it("listRoles throws on error", async () => {
    vi.mocked(api.GET).mockResolvedValue({
      error: { message: "Unauthorized", statusCode: 401, error: "Unauthorized" },
      response: new Response(),
    } as never);
    await expect(listRoles()).rejects.toThrow("Unauthorized");
  });

  it("createRole posts and returns role", async () => {
    const role = {
      id: "1",
      name: "admin",
      permissions: ["patients:read"],
      isSystem: false,
      createdAt: "",
      updatedAt: "",
    };
    vi.mocked(api.POST).mockResolvedValue({ data: role, response: new Response() } as never);
    const result = await createRole({ name: "admin", permissions: ["patients:read"] });
    expect(result).toEqual(role);
  });

  it("getRole fetches by id", async () => {
    vi.mocked(api.GET).mockResolvedValue({ data: { id: "1" }, response: new Response() } as never);
    await getRole("1");
    expect(api.GET).toHaveBeenCalledWith("/v1/roles/{roleId}", {
      params: { path: { roleId: "1" } },
    });
  });

  it("updateRole patches by id", async () => {
    vi.mocked(api.PATCH).mockResolvedValue({ data: { id: "1" }, response: new Response() } as never);
    await updateRole("1", { description: "Baru" });
    expect(api.PATCH).toHaveBeenCalledWith("/v1/roles/{roleId}", {
      params: { path: { roleId: "1" } },
      body: { description: "Baru" },
    });
  });

  it("deleteRole deletes by id", async () => {
    vi.mocked(api.DELETE).mockResolvedValue({ data: undefined, response: new Response() } as never);
    await deleteRole("1");
    expect(api.DELETE).toHaveBeenCalledWith("/v1/roles/{roleId}", {
      params: { path: { roleId: "1" } },
    });
  });
});
