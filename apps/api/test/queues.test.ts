import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { auth, buildTestApp, loginAsAdmin } from "./utils/build-test-app.js";

const PATIENT_ID = "11111111-1111-4111-8111-111111111111";

async function createQueue(
  app: Awaited<ReturnType<typeof buildTestApp>>,
  token: string,
) {
  const res = await app.inject({
    method: "POST",
    url: "/v1/queues",
    payload: { patientId: PATIENT_ID },
    headers: auth(token),
  });
  expect(res.statusCode).toBe(201);
  return res.json();
}

describe("queues", () => {
  let app: Awaited<ReturnType<typeof buildTestApp>>;
  let token: string;

  beforeEach(async () => {
    app = await buildTestApp();
    token = await loginAsAdmin(app);
  });

  afterEach(async () => {
    await app.close();
  });

  describe("POST /v1/queues", () => {
    it("creates a queue entry with status waiting and version 0", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/v1/queues",
        payload: { patientId: PATIENT_ID },
        headers: auth(token),
      });

      expect(res.statusCode).toBe(201);
      const body = res.json();
      expect(body.id).toBeTruthy();
      expect(body.patientId).toBe(PATIENT_ID);
      expect(body.status).toBe("waiting");
      expect(body.version).toBe(0);
      expect(body.createdAt).toBeTruthy();
    });

    it("rejects a second active queue for the same patient with 409", async () => {
      await createQueue(app, token);

      const res = await app.inject({
        method: "POST",
        url: "/v1/queues",
        payload: { patientId: PATIENT_ID },
        headers: auth(token),
      });

      expect(res.statusCode).toBe(409);
    });
  });

  describe("GET /v1/queues", () => {
    it("lists queue entries", async () => {
      await createQueue(app, token);

      const res = await app.inject({
        method: "GET",
        url: "/v1/queues",
        headers: auth(token),
      });

      expect(res.statusCode).toBe(200);
      expect(res.json()).toHaveLength(1);
    });

    it("returns a queue by id", async () => {
      const created = await createQueue(app, token);

      const res = await app.inject({
        method: "GET",
        url: `/v1/queues/${created.id}`,
        headers: auth(token),
      });

      expect(res.statusCode).toBe(200);
      expect(res.json().id).toBe(created.id);
    });

    it("returns 404 for an unknown queue", async () => {
      const res = await app.inject({
        method: "GET",
        url: "/v1/queues/unknown",
        headers: auth(token),
      });
      expect(res.statusCode).toBe(404);
    });
  });

  describe("PATCH /v1/queues/:id", () => {
    it("transitions waiting → in-service with a matching If-Match", async () => {
      const created = await createQueue(app, token);

      const res = await app.inject({
        method: "PATCH",
        url: `/v1/queues/${created.id}`,
        headers: { ...auth(token), "if-match": "0" },
        payload: { status: "in-service" },
      });

      expect(res.statusCode).toBe(200);
      expect(res.json().status).toBe("in-service");
      expect(res.json().version).toBe(1);
    });

    it("transitions in-service → done", async () => {
      const created = await createQueue(app, token);
      await app.inject({
        method: "PATCH",
        url: `/v1/queues/${created.id}`,
        headers: { ...auth(token), "if-match": "0" },
        payload: { status: "in-service" },
      });

      const res = await app.inject({
        method: "PATCH",
        url: `/v1/queues/${created.id}`,
        headers: { ...auth(token), "if-match": "1" },
        payload: { status: "done" },
      });

      expect(res.statusCode).toBe(200);
      expect(res.json().status).toBe("done");
      expect(res.json().version).toBe(2);
    });

    it("rejects an invalid transition (waiting → done) with 409", async () => {
      const created = await createQueue(app, token);

      const res = await app.inject({
        method: "PATCH",
        url: `/v1/queues/${created.id}`,
        headers: { ...auth(token), "if-match": "0" },
        payload: { status: "done" },
      });

      expect(res.statusCode).toBe(409);
    });

    it("rejects a stale If-Match version with 412", async () => {
      const created = await createQueue(app, token);

      const res = await app.inject({
        method: "PATCH",
        url: `/v1/queues/${created.id}`,
        headers: { ...auth(token), "if-match": "5" },
        payload: { status: "in-service" },
      });

      expect(res.statusCode).toBe(412);
    });

    it("rejects a missing If-Match header with 412", async () => {
      const created = await createQueue(app, token);

      const res = await app.inject({
        method: "PATCH",
        url: `/v1/queues/${created.id}`,
        headers: auth(token),
        payload: { status: "in-service" },
      });

      expect(res.statusCode).toBe(412);
    });
  });

  describe("DELETE /v1/queues/:id", () => {
    it("soft-deletes the queue (subsequent reads return 404)", async () => {
      const created = await createQueue(app, token);

      const del = await app.inject({ method: "DELETE", url: `/v1/queues/${created.id}`, headers: auth(token) });
      expect(del.statusCode).toBe(204);

      const get = await app.inject({ method: "GET", url: `/v1/queues/${created.id}`, headers: auth(token) });
      expect(get.statusCode).toBe(404);
    });

    it("returns 404 for an unknown queue", async () => {
      const res = await app.inject({ method: "DELETE", url: "/v1/queues/unknown", headers: auth(token) });
      expect(res.statusCode).toBe(404);
    });
  });
});
