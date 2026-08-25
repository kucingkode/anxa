import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { NewPatient } from "@simk/contracts";
import { auth, buildTestApp, loginAsAdmin } from "./utils/build-test-app.js";

describe("patients", () => {
  let app: Awaited<ReturnType<typeof buildTestApp>>;
  let token: string;

  beforeEach(async () => {
    app = await buildTestApp();
    token = await loginAsAdmin(app);
  });

  afterEach(async () => {
    await app.close();
  });

  describe("POST /v1/patients", () => {
    it("creates a patient and returns 201", async () => {
      const input: NewPatient = {
        name: "Budi Santoso",
        identifier: "3273010101010001",
        gender: "male",
      };

      const res = await app.inject({
        method: "POST",
        url: "/v1/patients",
        payload: input,
        headers: auth(token),
      });

      expect(res.statusCode).toBe(201);
      const body = res.json();
      expect(body.id).toBeTruthy();
      expect(body.name).toBe(input.name);
      expect(body.identifier).toBe(input.identifier);
      expect(body.createdAt).toBeTruthy();
    });

    it("rejects an invalid body with 400", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/v1/patients",
        payload: { name: "" },
        headers: auth(token),
      });

      expect(res.statusCode).toBe(400);
    });
  });

  describe("GET /v1/patients/:id", () => {
    it("returns 404 for an unknown patient", async () => {
      const res = await app.inject({
        method: "GET",
        url: "/v1/patients/unknown",
        headers: auth(token),
      });
      expect(res.statusCode).toBe(404);
    });

    it("returns the created patient", async () => {
      const created = await app.inject({
        method: "POST",
        url: "/v1/patients",
        payload: { name: "Siti Aminah", identifier: "3273010101010002", gender: "female" },
        headers: auth(token),
      });
      const { id } = created.json();

      const res = await app.inject({
        method: "GET",
        url: `/v1/patients/${id}`,
        headers: auth(token),
      });

      expect(res.statusCode).toBe(200);
      expect(res.json().id).toBe(id);
    });
  });

  describe("GET /v1/patients", () => {
    it("lists registered patients", async () => {
      await app.inject({
        method: "POST",
        url: "/v1/patients",
        payload: { name: "Siti Aminah", identifier: "3273010101010002", gender: "female" },
        headers: auth(token),
      });

      const res = await app.inject({
        method: "GET",
        url: "/v1/patients",
        headers: auth(token),
      });

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.json())).toBe(true);
      expect(res.json()).toHaveLength(1);
    });

    it("filters by name substring via the query parameter", async () => {
      await app.inject({
        method: "POST",
        url: "/v1/patients",
        payload: { name: "Budi Santoso", identifier: "3273010101010001", gender: "male" },
        headers: auth(token),
      });
      await app.inject({
        method: "POST",
        url: "/v1/patients",
        payload: { name: "Siti Aminah", identifier: "3273010101010002", gender: "female" },
        headers: auth(token),
      });

      const res = await app.inject({
        method: "GET",
        url: "/v1/patients?query=budi",
        headers: auth(token),
      });

      expect(res.statusCode).toBe(200);
      expect(res.json()).toHaveLength(1);
      expect(res.json()[0].name).toBe("Budi Santoso");
    });

    it("filters by identifier via the query parameter", async () => {
      await app.inject({
        method: "POST",
        url: "/v1/patients",
        payload: { name: "Budi Santoso", identifier: "3273010101010001", gender: "male" },
        headers: auth(token),
      });
      await app.inject({
        method: "POST",
        url: "/v1/patients",
        payload: { name: "Siti Aminah", identifier: "3273010101010002", gender: "female" },
        headers: auth(token),
      });

      const res = await app.inject({
        method: "GET",
        url: "/v1/patients?query=3273010101010002",
        headers: auth(token),
      });

      expect(res.statusCode).toBe(200);
      expect(res.json()).toHaveLength(1);
      expect(res.json()[0].identifier).toBe("3273010101010002");
    });

    it("paginates with limit and offset", async () => {
      for (let i = 1; i <= 5; i += 1) {
        await app.inject({
          method: "POST",
          url: "/v1/patients",
          payload: {
            name: `Pasien ${i}`,
            identifier: `32730101010100${String(i).padStart(2, "0")}`,
            gender: "male",
          },
          headers: auth(token),
        });
      }

      const first = await app.inject({
        method: "GET",
        url: "/v1/patients?limit=2&offset=0",
        headers: auth(token),
      });
      const second = await app.inject({
        method: "GET",
        url: "/v1/patients?limit=2&offset=2",
        headers: auth(token),
      });
      const third = await app.inject({
        method: "GET",
        url: "/v1/patients?limit=2&offset=4",
        headers: auth(token),
      });

      expect(first.statusCode).toBe(200);
      expect(first.json()).toHaveLength(2);
      expect(second.json()).toHaveLength(2);
      expect(third.json()).toHaveLength(1);

      const firstIds = first.json().map((p: { id: string }) => p.id);
      const secondIds = second.json().map((p: { id: string }) => p.id);
      const allIds = new Set([...firstIds, ...secondIds, ...third.json().map((p: { id: string }) => p.id)]);
      expect(allIds.size).toBe(5);
    });
  });

  describe("POST /v1/patients duplicate identifier", () => {
    it("rejects a duplicate NIK with 409", async () => {
      const payload = { name: "Budi Santoso", identifier: "3273010101010001", gender: "male" };
      await app.inject({ method: "POST", url: "/v1/patients", payload, headers: auth(token) });

      const res = await app.inject({ method: "POST", url: "/v1/patients", payload, headers: auth(token) });

      expect(res.statusCode).toBe(409);
    });
  });

  describe("PATCH /v1/patients/:id", () => {
    it("updates demographics and keeps the identifier immutable", async () => {
      const created = await app.inject({
        method: "POST",
        url: "/v1/patients",
        payload: { name: "Budi Santoso", identifier: "3273010101010001", gender: "male" },
        headers: auth(token),
      });
      const { id } = created.json();

      const res = await app.inject({
        method: "PATCH",
        url: `/v1/patients/${id}`,
        payload: { name: "Budi Santoso Jr.", phone: "081234567890" },
        headers: auth(token),
      });

      expect(res.statusCode).toBe(200);
      expect(res.json().name).toBe("Budi Santoso Jr.");
      expect(res.json().phone).toBe("081234567890");
      expect(res.json().identifier).toBe("3273010101010001");
    });

    it("returns 404 for an unknown patient", async () => {
      const res = await app.inject({
        method: "PATCH",
        url: "/v1/patients/unknown",
        payload: { name: "X" },
        headers: auth(token),
      });
      expect(res.statusCode).toBe(404);
    });
  });

  describe("DELETE /v1/patients/:id", () => {
    it("soft-deletes the patient (subsequent reads return 404)", async () => {
      const created = await app.inject({
        method: "POST",
        url: "/v1/patients",
        payload: { name: "Siti Aminah", identifier: "3273010101010002", gender: "female" },
        headers: auth(token),
      });
      const { id } = created.json();

      const del = await app.inject({ method: "DELETE", url: `/v1/patients/${id}`, headers: auth(token) });
      expect(del.statusCode).toBe(204);

      const get = await app.inject({ method: "GET", url: `/v1/patients/${id}`, headers: auth(token) });
      expect(get.statusCode).toBe(404);

      const list = await app.inject({ method: "GET", url: "/v1/patients", headers: auth(token) });
      expect(list.json()).toHaveLength(0);
    });

    it("returns 404 for an unknown patient", async () => {
      const res = await app.inject({ method: "DELETE", url: "/v1/patients/unknown", headers: auth(token) });
      expect(res.statusCode).toBe(404);
    });
  });
});
