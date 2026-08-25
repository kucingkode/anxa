import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { NewManufacturer } from "@simk/contracts";
import { auth, buildTestApp, loginAsAdmin } from "./utils/build-test-app.js";

describe("manufacturers", () => {
  let app: Awaited<ReturnType<typeof buildTestApp>>;
  let token: string;

  beforeEach(async () => {
    app = await buildTestApp();
    token = await loginAsAdmin(app);
  });

  afterEach(async () => {
    await app.close();
  });

  describe("POST /v1/manufacturers", () => {
    it("creates a manufacturer and returns 201", async () => {
      const input: NewManufacturer = {
        name: "PT Kimia Farma",
        identifier: "KF001",
        contact: "021-123456",
      };

      const res = await app.inject({
        method: "POST",
        url: "/v1/manufacturers",
        payload: input,
        headers: auth(token),
      });

      expect(res.statusCode).toBe(201);
      const manufacturer = res.json();
      expect(manufacturer.name).toBe("PT Kimia Farma");
      expect(manufacturer.identifier).toBe("KF001");
      expect(manufacturer.contact).toBe("021-123456");
      expect(manufacturer.id).toBeTruthy();
      expect(manufacturer.createdAt).toBeTruthy();
    });

    it("rejects an invalid body with 400", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/v1/manufacturers",
        payload: { name: "" },
        headers: auth(token),
      });

      expect(res.statusCode).toBe(400);
    });
  });

  describe("GET /v1/manufacturers", () => {
    it("lists manufacturers", async () => {
      await app.inject({
        method: "POST",
        url: "/v1/manufacturers",
        payload: { name: "Mfr A", identifier: "A001" },
        headers: auth(token),
      });
      await app.inject({
        method: "POST",
        url: "/v1/manufacturers",
        payload: { name: "Mfr B", identifier: "B001" },
        headers: auth(token),
      });

      const res = await app.inject({
        method: "GET",
        url: "/v1/manufacturers",
        headers: auth(token),
      });
      expect(res.statusCode).toBe(200);
      expect(res.json()).toHaveLength(2);
    });

    it("filters by query on name", async () => {
      await app.inject({
        method: "POST",
        url: "/v1/manufacturers",
        payload: { name: "Kimia Farma", identifier: "KF001" },
        headers: auth(token),
      });
      await app.inject({
        method: "POST",
        url: "/v1/manufacturers",
        payload: { name: "Bio Farma", identifier: "BF001" },
        headers: auth(token),
      });

      const res = await app.inject({
        method: "GET",
        url: "/v1/manufacturers?query=kimia",
        headers: auth(token),
      });
      expect(res.statusCode).toBe(200);
      expect(res.json()).toHaveLength(1);
      expect(res.json()[0].name).toBe("Kimia Farma");
    });

    it("filters by query on identifier", async () => {
      await app.inject({
        method: "POST",
        url: "/v1/manufacturers",
        payload: { name: "Kimia Farma", identifier: "KF001" },
        headers: auth(token),
      });
      await app.inject({
        method: "POST",
        url: "/v1/manufacturers",
        payload: { name: "Bio Farma", identifier: "BF001" },
        headers: auth(token),
      });

      const res = await app.inject({
        method: "GET",
        url: "/v1/manufacturers?query=BF001",
        headers: auth(token),
      });
      expect(res.statusCode).toBe(200);
      expect(res.json()).toHaveLength(1);
      expect(res.json()[0].identifier).toBe("BF001");
    });
  });

  describe("GET /v1/manufacturers/:id", () => {
    it("returns a manufacturer by id", async () => {
      const createRes = await app.inject({
        method: "POST",
        url: "/v1/manufacturers",
        payload: { name: "Test Mfr", identifier: "T001" },
        headers: auth(token),
      });
      const id = createRes.json().id;

      const res = await app.inject({
        method: "GET",
        url: `/v1/manufacturers/${id}`,
        headers: auth(token),
      });
      expect(res.statusCode).toBe(200);
      expect(res.json().id).toBe(id);
    });

    it("returns 404 for non-existent", async () => {
      const res = await app.inject({
        method: "GET",
        url: "/v1/manufacturers/nonexistent",
        headers: auth(token),
      });
      expect(res.statusCode).toBe(404);
    });
  });

  describe("PATCH /v1/manufacturers/:id", () => {
    it("updates a manufacturer", async () => {
      const createRes = await app.inject({
        method: "POST",
        url: "/v1/manufacturers",
        payload: { name: "Old Name", identifier: "OLD001" },
        headers: auth(token),
      });
      const id = createRes.json().id;

      const res = await app.inject({
        method: "PATCH",
        url: `/v1/manufacturers/${id}`,
        payload: { name: "New Name" },
        headers: auth(token),
      });
      expect(res.statusCode).toBe(200);
      expect(res.json().name).toBe("New Name");
    });

    it("returns 404 for non-existent", async () => {
      const res = await app.inject({
        method: "PATCH",
        url: "/v1/manufacturers/nonexistent",
        payload: { name: "X" },
        headers: auth(token),
      });
      expect(res.statusCode).toBe(404);
    });
  });

  describe("DELETE /v1/manufacturers/:id", () => {
    it("soft-deletes and returns 204", async () => {
      const createRes = await app.inject({
        method: "POST",
        url: "/v1/manufacturers",
        payload: { name: "To Delete", identifier: "DEL001" },
        headers: auth(token),
      });
      const id = createRes.json().id;

      const res = await app.inject({
        method: "DELETE",
        url: `/v1/manufacturers/${id}`,
        headers: auth(token),
      });
      expect(res.statusCode).toBe(204);

      const getRes = await app.inject({
        method: "GET",
        url: `/v1/manufacturers/${id}`,
        headers: auth(token),
      });
      expect(getRes.statusCode).toBe(404);
    });

    it("returns 404 for non-existent", async () => {
      const res = await app.inject({
        method: "DELETE",
        url: "/v1/manufacturers/nonexistent",
        headers: auth(token),
      });
      expect(res.statusCode).toBe(404);
    });
  });
});
