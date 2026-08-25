import { describe, expect, it, vi } from "vitest";
import { api } from "@/lib/api";
import {
  createManufacturer,
  deleteManufacturer,
  getManufacturer,
  listManufacturers,
  updateManufacturer,
} from "../api/manufacturers";

vi.mock("@/lib/api", () => ({
  api: {
    GET: vi.fn(),
    POST: vi.fn(),
    PATCH: vi.fn(),
    DELETE: vi.fn(),
  },
}));

describe("manufacturers api", () => {
  it("listManufacturers returns data", async () => {
    vi.mocked(api.GET).mockResolvedValue({ data: [], response: new Response() } as never);
    const result = await listManufacturers();
    expect(result).toEqual([]);
    expect(api.GET).toHaveBeenCalledWith("/v1/manufacturers", {
      params: { query: { query: undefined, limit: undefined, offset: undefined } },
    });
  });

  it("listManufacturers throws on error", async () => {
    vi.mocked(api.GET).mockResolvedValue({
      error: { message: "Unauthorized", statusCode: 401, error: "Unauthorized" },
      response: new Response(),
    } as never);
    await expect(listManufacturers()).rejects.toThrow("Unauthorized");
  });

  it("createManufacturer posts and returns manufacturer", async () => {
    const manufacturer = { id: "1", name: "Kimia Farma", identifier: "MF-001", createdAt: "" };
    vi.mocked(api.POST).mockResolvedValue({ data: manufacturer, response: new Response() } as never);
    const result = await createManufacturer({ name: "Kimia Farma", identifier: "MF-001" });
    expect(result).toEqual(manufacturer);
  });

  it("getManufacturer fetches by id", async () => {
    vi.mocked(api.GET).mockResolvedValue({ data: { id: "1" }, response: new Response() } as never);
    await getManufacturer("1");
    expect(api.GET).toHaveBeenCalledWith("/v1/manufacturers/{manufacturerId}", {
      params: { path: { manufacturerId: "1" } },
    });
  });

  it("updateManufacturer patches by id", async () => {
    vi.mocked(api.PATCH).mockResolvedValue({ data: { id: "1" }, response: new Response() } as never);
    await updateManufacturer("1", { name: "Kimia Farma Baru" });
    expect(api.PATCH).toHaveBeenCalledWith(
      "/v1/manufacturers/{manufacturerId}",
      { params: { path: { manufacturerId: "1" } }, body: { name: "Kimia Farma Baru" } },
    );
  });

  it("deleteManufacturer deletes by id", async () => {
    vi.mocked(api.DELETE).mockResolvedValue({ data: undefined, response: new Response() } as never);
    await deleteManufacturer("1");
    expect(api.DELETE).toHaveBeenCalledWith("/v1/manufacturers/{manufacturerId}", {
      params: { path: { manufacturerId: "1" } },
    });
  });
});
