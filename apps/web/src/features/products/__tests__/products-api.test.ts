import { describe, expect, it, vi } from "vitest";
import { api } from "@/lib/api";
import { createProduct, deleteProduct, getProduct, listProducts, updateProduct } from "../api/products";

vi.mock("@/lib/api", () => ({
  api: {
    GET: vi.fn(),
    POST: vi.fn(),
    PATCH: vi.fn(),
    DELETE: vi.fn(),
  },
}));

describe("products api", () => {
  it("listProducts returns data", async () => {
    vi.mocked(api.GET).mockResolvedValue({ data: [], response: new Response() } as never);
    const result = await listProducts();
    expect(result).toEqual([]);
    expect(api.GET).toHaveBeenCalledWith("/v1/products", {
      params: { query: { query: undefined, manufacturerId: undefined, limit: undefined, offset: undefined } },
    });
  });

  it("listProducts throws on error", async () => {
    vi.mocked(api.GET).mockResolvedValue({
      error: { message: "Unauthorized", statusCode: 401, error: "Unauthorized" },
      response: new Response(),
    } as never);
    await expect(listProducts()).rejects.toThrow("Unauthorized");
  });

  it("createProduct posts and returns product", async () => {
    const product = { id: "1", name: "Paracetamol", code: "KFA-001", unit: "tablet", manufacturerId: "m1", createdAt: "" };
    vi.mocked(api.POST).mockResolvedValue({ data: product, response: new Response() } as never);
    const result = await createProduct({ name: "Paracetamol", code: "KFA-001", unit: "tablet", manufacturerId: "m1" });
    expect(result).toEqual(product);
  });

  it("getProduct fetches by id", async () => {
    vi.mocked(api.GET).mockResolvedValue({ data: { id: "1" }, response: new Response() } as never);
    await getProduct("1");
    expect(api.GET).toHaveBeenCalledWith("/v1/products/{productId}", { params: { path: { productId: "1" } } });
  });

  it("updateProduct patches by id", async () => {
    vi.mocked(api.PATCH).mockResolvedValue({ data: { id: "1" }, response: new Response() } as never);
    await updateProduct("1", { name: "Paracetamol Baru" });
    expect(api.PATCH).toHaveBeenCalledWith(
      "/v1/products/{productId}",
      { params: { path: { productId: "1" } }, body: { name: "Paracetamol Baru" } },
    );
  });

  it("deleteProduct deletes by id", async () => {
    vi.mocked(api.DELETE).mockResolvedValue({ data: undefined, response: new Response() } as never);
    await deleteProduct("1");
    expect(api.DELETE).toHaveBeenCalledWith("/v1/products/{productId}", { params: { path: { productId: "1" } } });
  });
});
