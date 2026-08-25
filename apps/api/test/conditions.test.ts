import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { auth, buildTestApp, loginAsAdmin } from "./utils/build-test-app.js";

const PATIENT_ID = "11111111-1111-4111-8111-111111111111";
const VISIT_ID = "22222222-2222-4222-8222-222222222222";

async function createCondition(
  app: Awaited<ReturnType<typeof buildTestApp>>,
  token: string,
) {
  const res = await app.inject({
    method: "POST",
    url: "/v1/conditions",
    payload: {
      patientId: PATIENT_ID,
      visitId: VISIT_ID,
      code: "I10",
      codeDisplay: "Essential hypertension",
    },
    headers: auth(token),
  });
  expect(res.statusCode).toBe(201);
  return res.json();
}

describe("conditions", () => {
  let app: Awaited<ReturnType<typeof buildTestApp>>;
  let token: string;

  beforeEach(async () => {
    app = await buildTestApp();
    token = await loginAsAdmin(app);
  });

  afterEach(async () => {
    await app.close();
  });

  it("creates a condition", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/v1/conditions",
      payload: { patientId: PATIENT_ID, visitId: VISIT_ID, code: "I10" },
      headers: auth(token),
    });

    expect(res.statusCode).toBe(201);
    const body = res.json();
    expect(body.id).toBeTruthy();
    expect(body.code).toBe("I10");
  });

  it("lists and gets conditions", async () => {
    const created = await createCondition(app, token);

    const list = await app.inject({
      method: "GET",
      url: "/v1/conditions",
      headers: auth(token),
    });
    expect(list.statusCode).toBe(200);
    expect(list.json()).toHaveLength(1);

    const get = await app.inject({
      method: "GET",
      url: `/v1/conditions/${created.id}`,
      headers: auth(token),
    });
    expect(get.statusCode).toBe(200);
    expect(get.json().id).toBe(created.id);
  });

  it("updates a condition", async () => {
    const created = await createCondition(app, token);

    const res = await app.inject({
      method: "PATCH",
      url: `/v1/conditions/${created.id}`,
      payload: { clinicalStatus: "resolved", notes: "Under control" },
      headers: auth(token),
    });

    expect(res.statusCode).toBe(200);
    expect(res.json().clinicalStatus).toBe("resolved");
    expect(res.json().notes).toBe("Under control");
  });

  it("soft-deletes a condition", async () => {
    const created = await createCondition(app, token);

    const del = await app.inject({
      method: "DELETE",
      url: `/v1/conditions/${created.id}`,
      headers: auth(token),
    });
    expect(del.statusCode).toBe(204);

    const get = await app.inject({
      method: "GET",
      url: `/v1/conditions/${created.id}`,
      headers: auth(token),
    });
    expect(get.statusCode).toBe(404);
  });

  it("returns 404 for an unknown condition", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/v1/conditions/unknown",
      headers: auth(token),
    });
    expect(res.statusCode).toBe(404);
  });
});
