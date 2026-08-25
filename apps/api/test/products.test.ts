import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { NewProduct } from "@simk/contracts";
import { auth, buildTestApp, loginAsAdmin } from "./utils/build-test-app.js";

describe("products", () => {
  let app: Awaited<ReturnType<typeof buildTestApp>>;
  let token: string;

  beforeEach(async () => {
    app = await buildTestApp();
    token = await loginAsAdmin(app);
  });

  afterEach(async () => {
    await app.close();
  });

  describe("POST /v1/products", () => {
    it("creates a product and returns 201", async () => {
      const input: NewProduct = {
        name: "Paracetamol 500mg",
        code: "PCM500",
        unit: "tablet",
        manufacturerId: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
      };

      const res = await app.inject({
        method: "POST",
        url: "/v1/products",
        payload: input,
        headers: auth(token),
      });

      expect(res.statusCode).toBe(201);
      const product = res.json();
      expect(product.name).toBe("Paracetamol 500mg");
      expect(product.code).toBe("PCM500");
      expect(product.unit).toBe("tablet");
      expect(product.manufacturerId).toBe("aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa");
      expect(product.id).toBeTruthy();
      expect(product.createdAt).toBeTruthy();
    });

    it("rejects an invalid body with 400", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/v1/products",
        payload: { name: "" },
        headers: auth(token),
      });

      expect(res.statusCode).toBe(400);
    });
  });

  describe("GET /v1/products", () => {
    it("lists products", async () => {
      await app.inject({
        method: "POST",
        url: "/v1/products",
        payload: { name: "Item A", code: "A", unit: "box", manufacturerId: "m1" },
        headers: auth(token),
      });
      await app.inject({
        method: "POST",
        url: "/v1/products",
        payload: { name: "Item B", code: "B", unit: "box", manufacturerId: "m1" },
        headers: auth(token),
      });

      const res = await app.inject({
        method: "GET",
        url: "/v1/products",
        headers: auth(token),
      });
      expect(res.statusCode).toBe(200);
      expect(res.json()).toHaveLength(2);
    });

    it("filters by query", async () => {
      await app.inject({
        method: "POST",
        url: "/v1/products",
        payload: { name: "Aspirin", code: "ASP", unit: "tablet", manufacturerId: "m1" },
        headers: auth(token),
      });
      await app.inject({
        method: "POST",
        url: "/v1/products",
        payload: { name: "Paracetamol", code: "PCM", unit: "tablet", manufacturerId: "m2" },
        headers: auth(token),
      });

      const res = await app.inject({
        method: "GET",
        url: "/v1/products?query=para",
        headers: auth(token),
      });
      expect(res.statusCode).toBe(200);
      expect(res.json()).toHaveLength(1);
      expect(res.json()[0].name).toBe("Paracetamol");
    });

    it("filters by manufacturerId", async () => {
      await app.inject({
        method: "POST",
        url: "/v1/products",
        payload: { name: "A", code: "A", unit: "u", manufacturerId: "m1" },
        headers: auth(token),
      });
      await app.inject({
        method: "POST",
        url: "/v1/products",
        payload: { name: "B", code: "B", unit: "u", manufacturerId: "m2" },
        headers: auth(token),
      });

      const res = await app.inject({
        method: "GET",
        url: "/v1/products?manufacturerId=m1",
        headers: auth(token),
      });
      expect(res.json()).toHaveLength(1);
      expect(res.json()[0].name).toBe("A");
    });
  });

  describe("GET /v1/products/:id", () => {
    it("returns a product by id", async () => {
      const createRes = await app.inject({
        method: "POST",
        url: "/v1/products",
        payload: { name: "Test", code: "T", unit: "u", manufacturerId: "m" },
        headers: auth(token),
      });
      const id = createRes.json().id;

      const res = await app.inject({
        method: "GET",
        url: `/v1/products/${id}`,
        headers: auth(token),
      });
      expect(res.statusCode).toBe(200);
      expect(res.json().id).toBe(id);
    });

    it("returns 404 for non-existent", async () => {
      const res = await app.inject({
        method: "GET",
        url: "/v1/products/nonexistent",
        headers: auth(token),
      });
      expect(res.statusCode).toBe(404);
    });
  });

  describe("PATCH /v1/products/:id", () => {
    it("updates a product", async () => {
      const createRes = await app.inject({
        method: "POST",
        url: "/v1/products",
        payload: { name: "Old", code: "O", unit: "u", manufacturerId: "m" },
        headers: auth(token),
      });
      const id = createRes.json().id;

      const res = await app.inject({
        method: "PATCH",
        url: `/v1/products/${id}`,
        payload: { name: "New Name" },
        headers: auth(token),
      });
      expect(res.statusCode).toBe(200);
      expect(res.json().name).toBe("New Name");
    });

    it("returns 404 for non-existent", async () => {
      const res = await app.inject({
        method: "PATCH",
        url: "/v1/products/nonexistent",
        payload: { name: "X" },
        headers: auth(token),
      });
      expect(res.statusCode).toBe(404);
    });
  });

  describe("DELETE /v1/products/:id", () => {
    it("soft-deletes and returns 204", async () => {
      const createRes = await app.inject({
        method: "POST",
        url: "/v1/products",
        payload: { name: "Del", code: "D", unit: "u", manufacturerId: "m" },
        headers: auth(token),
      });
      const id = createRes.json().id;

      const res = await app.inject({
        method: "DELETE",
        url: `/v1/products/${id}`,
        headers: auth(token),
      });
      expect(res.statusCode).toBe(204);

      const getRes = await app.inject({
        method: "GET",
        url: `/v1/products/${id}`,
        headers: auth(token),
      });
      expect(getRes.statusCode).toBe(404);
    });

    it("returns 404 for non-existent", async () => {
      const res = await app.inject({
        method: "DELETE",
        url: "/v1/products/nonexistent",
        headers: auth(token),
      });
      expect(res.statusCode).toBe(404);
    });
  });
});
