import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { auth, buildTestApp, loginAsAdmin } from "./utils/build-test-app.js";

const PATIENT_ID = "11111111-1111-4111-8111-111111111111";
const VISIT_ID = "22222222-2222-4222-8222-222222222222";

async function createProcedure(
  app: Awaited<ReturnType<typeof buildTestApp>>,
  token: string,
) {
  const res = await app.inject({
    method: "POST",
    url: "/v1/procedures",
    payload: {
      patientId: PATIENT_ID,
      visitId: VISIT_ID,
      code: "47.01",
      codeDisplay: "Laparoscopic appendectomy",
    },
    headers: auth(token),
  });
  expect(res.statusCode).toBe(201);
  return res.json();
}

describe("procedures", () => {
  let app: Awaited<ReturnType<typeof buildTestApp>>;
  let token: string;

  beforeEach(async () => {
    app = await buildTestApp();
    token = await loginAsAdmin(app);
  });

  afterEach(async () => {
    await app.close();
  });

  it("creates a procedure", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/v1/procedures",
      payload: { patientId: PATIENT_ID, visitId: VISIT_ID, code: "47.01" },
      headers: auth(token),
    });

    expect(res.statusCode).toBe(201);
    const body = res.json();
    expect(body.id).toBeTruthy();
    expect(body.code).toBe("47.01");
  });

  it("lists and gets procedures", async () => {
    const created = await createProcedure(app, token);

    const list = await app.inject({
      method: "GET",
      url: "/v1/procedures",
      headers: auth(token),
    });
    expect(list.statusCode).toBe(200);
    expect(list.json()).toHaveLength(1);

    const get = await app.inject({
      method: "GET",
      url: `/v1/procedures/${created.id}`,
      headers: auth(token),
    });
    expect(get.statusCode).toBe(200);
    expect(get.json().id).toBe(created.id);
  });

  it("updates a procedure status and performedAt", async () => {
    const created = await createProcedure(app, token);

    const res = await app.inject({
      method: "PATCH",
      url: `/v1/procedures/${created.id}`,
      payload: { status: "completed", performedAt: "2026-08-19T10:00:00.000Z" },
      headers: auth(token),
    });

    expect(res.statusCode).toBe(200);
    expect(res.json().status).toBe("completed");
    expect(res.json().performedAt).toBe("2026-08-19T10:00:00.000Z");
  });

  it("soft-deletes a procedure", async () => {
    const created = await createProcedure(app, token);

    const del = await app.inject({
      method: "DELETE",
      url: `/v1/procedures/${created.id}`,
      headers: auth(token),
    });
    expect(del.statusCode).toBe(204);

    const get = await app.inject({
      method: "GET",
      url: `/v1/procedures/${created.id}`,
      headers: auth(token),
    });
    expect(get.statusCode).toBe(404);
  });

  it("returns 404 for an unknown procedure", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/v1/procedures/unknown",
      headers: auth(token),
    });
    expect(res.statusCode).toBe(404);
  });
});
