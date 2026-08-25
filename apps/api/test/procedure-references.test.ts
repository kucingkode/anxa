import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { NewProcedureReference } from "@simk/contracts";
import { auth, buildTestApp, loginAsAdmin } from "./utils/build-test-app.js";

describe("procedure references", () => {
  let app: Awaited<ReturnType<typeof buildTestApp>>;
  let token: string;

  beforeEach(async () => {
    app = await buildTestApp();
    token = await loginAsAdmin(app);
  });

  afterEach(async () => {
    await app.close();
  });

  describe("POST /v1/procedure-references", () => {
    it("creates a procedure reference and returns 201", async () => {
      const input: NewProcedureReference = {
        code: "47.0",
        display: "Appendectomy",
      };

      const res = await app.inject({
        method: "POST",
        url: "/v1/procedure-references",
        payload: input,
        headers: auth(token),
      });

      expect(res.statusCode).toBe(201);
      const ref = res.json();
      expect(ref.code).toBe("47.0");
      expect(ref.display).toBe("Appendectomy");
      expect(ref.id).toBeTruthy();
      expect(ref.createdAt).toBeTruthy();
    });

    it("rejects an invalid body with 400", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/v1/procedure-references",
        payload: { code: "" },
        headers: auth(token),
      });

      expect(res.statusCode).toBe(400);
    });
  });

  describe("GET /v1/procedure-references", () => {
    it("lists procedure references", async () => {
      await app.inject({
        method: "POST",
        url: "/v1/procedure-references",
        payload: { code: "47.0", display: "Appendectomy" },
        headers: auth(token),
      });
      await app.inject({
        method: "POST",
        url: "/v1/procedure-references",
        payload: { code: "45.82", display: "Open colon resection" },
        headers: auth(token),
      });

      const res = await app.inject({
        method: "GET",
        url: "/v1/procedure-references",
        headers: auth(token),
      });
      expect(res.statusCode).toBe(200);
      expect(res.json()).toHaveLength(2);
    });

    it("filters by query on code", async () => {
      await app.inject({
        method: "POST",
        url: "/v1/procedure-references",
        payload: { code: "47.0", display: "Appendectomy" },
        headers: auth(token),
      });
      await app.inject({
        method: "POST",
        url: "/v1/procedure-references",
        payload: { code: "45.82", display: "Open colon resection" },
        headers: auth(token),
      });

      const res = await app.inject({
        method: "GET",
        url: "/v1/procedure-references?query=47.0",
        headers: auth(token),
      });
      expect(res.statusCode).toBe(200);
      expect(res.json()).toHaveLength(1);
      expect(res.json()[0].code).toBe("47.0");
    });

    it("filters by query on display", async () => {
      await app.inject({
        method: "POST",
        url: "/v1/procedure-references",
        payload: { code: "47.0", display: "Appendectomy" },
        headers: auth(token),
      });
      await app.inject({
        method: "POST",
        url: "/v1/procedure-references",
        payload: { code: "45.82", display: "Open colon resection" },
        headers: auth(token),
      });

      const res = await app.inject({
        method: "GET",
        url: "/v1/procedure-references?query=colon",
        headers: auth(token),
      });
      expect(res.statusCode).toBe(200);
      expect(res.json()).toHaveLength(1);
      expect(res.json()[0].display).toBe("Open colon resection");
    });
  });

  describe("GET /v1/procedure-references/:id", () => {
    it("returns a procedure reference by id", async () => {
      const createRes = await app.inject({
        method: "POST",
        url: "/v1/procedure-references",
        payload: { code: "47.0", display: "Appendectomy" },
        headers: auth(token),
      });
      const id = createRes.json().id;

      const res = await app.inject({
        method: "GET",
        url: `/v1/procedure-references/${id}`,
        headers: auth(token),
      });
      expect(res.statusCode).toBe(200);
      expect(res.json().id).toBe(id);
    });

    it("returns 404 for non-existent", async () => {
      const res = await app.inject({
        method: "GET",
        url: "/v1/procedure-references/nonexistent",
        headers: auth(token),
      });
      expect(res.statusCode).toBe(404);
    });
  });

  describe("PATCH /v1/procedure-references/:id", () => {
    it("updates a procedure reference", async () => {
      const createRes = await app.inject({
        method: "POST",
        url: "/v1/procedure-references",
        payload: { code: "OLD", display: "Old Display" },
        headers: auth(token),
      });
      const id = createRes.json().id;

      const res = await app.inject({
        method: "PATCH",
        url: `/v1/procedure-references/${id}`,
        payload: { display: "New Display" },
        headers: auth(token),
      });
      expect(res.statusCode).toBe(200);
      expect(res.json().display).toBe("New Display");
    });

    it("returns 404 for non-existent", async () => {
      const res = await app.inject({
        method: "PATCH",
        url: "/v1/procedure-references/nonexistent",
        payload: { display: "X" },
        headers: auth(token),
      });
      expect(res.statusCode).toBe(404);
    });
  });

  describe("DELETE /v1/procedure-references/:id", () => {
    it("hard-deletes and returns 204", async () => {
      const createRes = await app.inject({
        method: "POST",
        url: "/v1/procedure-references",
        payload: { code: "DEL", display: "To Delete" },
        headers: auth(token),
      });
      const id = createRes.json().id;

      const res = await app.inject({
        method: "DELETE",
        url: `/v1/procedure-references/${id}`,
        headers: auth(token),
      });
      expect(res.statusCode).toBe(204);

      const getRes = await app.inject({
        method: "GET",
        url: `/v1/procedure-references/${id}`,
        headers: auth(token),
      });
      expect(getRes.statusCode).toBe(404);
    });

    it("returns 404 for non-existent", async () => {
      const res = await app.inject({
        method: "DELETE",
        url: "/v1/procedure-references/nonexistent",
        headers: auth(token),
      });
      expect(res.statusCode).toBe(404);
    });
  });
});
