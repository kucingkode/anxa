import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { auth, buildTestApp, loginAsAdmin } from "./utils/build-test-app.js";

const PATIENT_ID = "11111111-1111-4111-8111-111111111111";
const VISIT_ID = "22222222-2222-4222-8222-222222222222";

async function createObservation(
  app: Awaited<ReturnType<typeof buildTestApp>>,
  token: string,
) {
  const res = await app.inject({
    method: "POST",
    url: "/v1/observations",
    payload: {
      patientId: PATIENT_ID,
      visitId: VISIT_ID,
      code: "8867-4",
      codeDisplay: "Heart rate",
      value: 72,
      unit: "beats/min",
    },
    headers: auth(token),
  });
  expect(res.statusCode).toBe(201);
  return res.json();
}

describe("observations", () => {
  let app: Awaited<ReturnType<typeof buildTestApp>>;
  let token: string;

  beforeEach(async () => {
    app = await buildTestApp();
    token = await loginAsAdmin(app);
  });

  afterEach(async () => {
    await app.close();
  });

  describe("POST /v1/observations", () => {
    it("creates an observation with status preliminary and version 0", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/v1/observations",
        payload: {
          patientId: PATIENT_ID,
          visitId: VISIT_ID,
          code: "8867-4",
          value: 72,
        },
        headers: auth(token),
      });

      expect(res.statusCode).toBe(201);
      const body = res.json();
      expect(body.id).toBeTruthy();
      expect(body.status).toBe("preliminary");
      expect(body.value).toBe(72);
      expect(body.version).toBe(0);
    });

    it("rejects a body without a numeric value with 400", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/v1/observations",
        payload: { patientId: PATIENT_ID, visitId: VISIT_ID, code: "8867-4" },
        headers: auth(token),
      });
      expect(res.statusCode).toBe(400);
    });
  });

  describe("GET /v1/observations", () => {
    it("lists observations", async () => {
      await createObservation(app, token);
      const res = await app.inject({
        method: "GET",
        url: "/v1/observations",
        headers: auth(token),
      });
      expect(res.statusCode).toBe(200);
      expect(res.json()).toHaveLength(1);
    });

    it("returns an observation by id", async () => {
      const created = await createObservation(app, token);
      const res = await app.inject({
        method: "GET",
        url: `/v1/observations/${created.id}`,
        headers: auth(token),
      });
      expect(res.statusCode).toBe(200);
      expect(res.json().id).toBe(created.id);
    });
  });

  describe("PATCH /v1/observations/:id", () => {
    it("updates the value with a matching If-Match", async () => {
      const created = await createObservation(app, token);

      const res = await app.inject({
        method: "PATCH",
        url: `/v1/observations/${created.id}`,
        headers: { ...auth(token), "if-match": "0" },
        payload: { value: 80 },
      });

      expect(res.statusCode).toBe(200);
      expect(res.json().value).toBe(80);
      expect(res.json().version).toBe(1);
    });

    it("rejects a stale If-Match with 412", async () => {
      const created = await createObservation(app, token);

      const res = await app.inject({
        method: "PATCH",
        url: `/v1/observations/${created.id}`,
        headers: { ...auth(token), "if-match": "3" },
        payload: { value: 80 },
      });

      expect(res.statusCode).toBe(412);
    });
  });

  describe("PATCH /v1/observations/:id/status", () => {
    it("transitions preliminary → final", async () => {
      const created = await createObservation(app, token);

      const res = await app.inject({
        method: "PATCH",
        url: `/v1/observations/${created.id}/status`,
        headers: { ...auth(token), "if-match": "0" },
        payload: { status: "final" },
      });

      expect(res.statusCode).toBe(200);
      expect(res.json().status).toBe("final");
    });

    it("rejects an invalid transition (preliminary → amended) with 409", async () => {
      const created = await createObservation(app, token);

      const res = await app.inject({
        method: "PATCH",
        url: `/v1/observations/${created.id}/status`,
        headers: { ...auth(token), "if-match": "0" },
        payload: { status: "amended" },
      });

      expect(res.statusCode).toBe(409);
    });

    it("rejects a stale If-Match with 412", async () => {
      const created = await createObservation(app, token);

      const res = await app.inject({
        method: "PATCH",
        url: `/v1/observations/${created.id}/status`,
        headers: { ...auth(token), "if-match": "9" },
        payload: { status: "final" },
      });

      expect(res.statusCode).toBe(412);
    });
  });

  describe("DELETE /v1/observations/:id", () => {
    it("soft-deletes by setting status entered-in-error", async () => {
      const created = await createObservation(app, token);

      const del = await app.inject({
        method: "DELETE",
        url: `/v1/observations/${created.id}`,
        headers: auth(token),
      });
      expect(del.statusCode).toBe(204);

      const get = await app.inject({
        method: "GET",
        url: `/v1/observations/${created.id}`,
        headers: auth(token),
      });
      expect(get.statusCode).toBe(200);
      expect(get.json().status).toBe("entered-in-error");
    });

    it("rejects deleting an already-terminal observation with 409", async () => {
      const created = await createObservation(app, token);

      await app.inject({
        method: "DELETE",
        url: `/v1/observations/${created.id}`,
        headers: auth(token),
      });
      const res = await app.inject({
        method: "DELETE",
        url: `/v1/observations/${created.id}`,
        headers: auth(token),
      });

      expect(res.statusCode).toBe(409);
    });

    it("returns 404 for an unknown observation", async () => {
      const res = await app.inject({
        method: "DELETE",
        url: "/v1/observations/unknown",
        headers: auth(token),
      });
      expect(res.statusCode).toBe(404);
    });
  });
});
