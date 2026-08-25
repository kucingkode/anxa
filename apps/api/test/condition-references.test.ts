import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { NewConditionReference } from "@simk/contracts";
import { auth, buildTestApp, loginAsAdmin } from "./utils/build-test-app.js";

describe("condition references", () => {
  let app: Awaited<ReturnType<typeof buildTestApp>>;
  let token: string;

  beforeEach(async () => {
    app = await buildTestApp();
    token = await loginAsAdmin(app);
  });

  afterEach(async () => {
    await app.close();
  });

  describe("POST /v1/condition-references", () => {
    it("creates a condition reference and returns 201", async () => {
      const input: NewConditionReference = {
        code: "I10",
        display: "Essential hypertension",
      };

      const res = await app.inject({
        method: "POST",
        url: "/v1/condition-references",
        payload: input,
        headers: auth(token),
      });

      expect(res.statusCode).toBe(201);
      const ref = res.json();
      expect(ref.code).toBe("I10");
      expect(ref.display).toBe("Essential hypertension");
      expect(ref.id).toBeTruthy();
      expect(ref.createdAt).toBeTruthy();
    });

    it("rejects an invalid body with 400", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/v1/condition-references",
        payload: { code: "" },
        headers: auth(token),
      });

      expect(res.statusCode).toBe(400);
    });
  });

  describe("GET /v1/condition-references", () => {
    it("lists condition references", async () => {
      await app.inject({
        method: "POST",
        url: "/v1/condition-references",
        payload: { code: "I10", display: "Essential hypertension" },
        headers: auth(token),
      });
      await app.inject({
        method: "POST",
        url: "/v1/condition-references",
        payload: { code: "E11", display: "Type 2 diabetes" },
        headers: auth(token),
      });

      const res = await app.inject({
        method: "GET",
        url: "/v1/condition-references",
        headers: auth(token),
      });
      expect(res.statusCode).toBe(200);
      expect(res.json()).toHaveLength(2);
    });

    it("filters by query on code", async () => {
      await app.inject({
        method: "POST",
        url: "/v1/condition-references",
        payload: { code: "I10", display: "Essential hypertension" },
        headers: auth(token),
      });
      await app.inject({
        method: "POST",
        url: "/v1/condition-references",
        payload: { code: "J45", display: "Asthma" },
        headers: auth(token),
      });

      const res = await app.inject({
        method: "GET",
        url: "/v1/condition-references?query=I10",
        headers: auth(token),
      });
      expect(res.statusCode).toBe(200);
      expect(res.json()).toHaveLength(1);
      expect(res.json()[0].code).toBe("I10");
    });

    it("filters by query on display", async () => {
      await app.inject({
        method: "POST",
        url: "/v1/condition-references",
        payload: { code: "I10", display: "Essential hypertension" },
        headers: auth(token),
      });
      await app.inject({
        method: "POST",
        url: "/v1/condition-references",
        payload: { code: "J45", display: "Asthma" },
        headers: auth(token),
      });

      const res = await app.inject({
        method: "GET",
        url: "/v1/condition-references?query=asthma",
        headers: auth(token),
      });
      expect(res.statusCode).toBe(200);
      expect(res.json()).toHaveLength(1);
      expect(res.json()[0].display).toBe("Asthma");
    });
  });

  describe("GET /v1/condition-references/:id", () => {
    it("returns a condition reference by id", async () => {
      const createRes = await app.inject({
        method: "POST",
        url: "/v1/condition-references",
        payload: { code: "I10", display: "Hypertension" },
        headers: auth(token),
      });
      const id = createRes.json().id;

      const res = await app.inject({
        method: "GET",
        url: `/v1/condition-references/${id}`,
        headers: auth(token),
      });
      expect(res.statusCode).toBe(200);
      expect(res.json().id).toBe(id);
    });

    it("returns 404 for non-existent", async () => {
      const res = await app.inject({
        method: "GET",
        url: "/v1/condition-references/nonexistent",
        headers: auth(token),
      });
      expect(res.statusCode).toBe(404);
    });
  });

  describe("PATCH /v1/condition-references/:id", () => {
    it("updates a condition reference", async () => {
      const createRes = await app.inject({
        method: "POST",
        url: "/v1/condition-references",
        payload: { code: "OLD", display: "Old Display" },
        headers: auth(token),
      });
      const id = createRes.json().id;

      const res = await app.inject({
        method: "PATCH",
        url: `/v1/condition-references/${id}`,
        payload: { display: "New Display" },
        headers: auth(token),
      });
      expect(res.statusCode).toBe(200);
      expect(res.json().display).toBe("New Display");
    });

    it("returns 404 for non-existent", async () => {
      const res = await app.inject({
        method: "PATCH",
        url: "/v1/condition-references/nonexistent",
        payload: { display: "X" },
        headers: auth(token),
      });
      expect(res.statusCode).toBe(404);
    });
  });

  describe("DELETE /v1/condition-references/:id", () => {
    it("hard-deletes and returns 204", async () => {
      const createRes = await app.inject({
        method: "POST",
        url: "/v1/condition-references",
        payload: { code: "DEL", display: "To Delete" },
        headers: auth(token),
      });
      const id = createRes.json().id;

      const res = await app.inject({
        method: "DELETE",
        url: `/v1/condition-references/${id}`,
        headers: auth(token),
      });
      expect(res.statusCode).toBe(204);

      const getRes = await app.inject({
        method: "GET",
        url: `/v1/condition-references/${id}`,
        headers: auth(token),
      });
      expect(getRes.statusCode).toBe(404);
    });

    it("returns 404 for non-existent", async () => {
      const res = await app.inject({
        method: "DELETE",
        url: "/v1/condition-references/nonexistent",
        headers: auth(token),
      });
      expect(res.statusCode).toBe(404);
    });
  });
});
