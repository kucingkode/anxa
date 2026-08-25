import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { auth, buildTestApp, loginAsAdmin } from "./utils/build-test-app.js";

const PATIENT_ID = "11111111-1111-4111-8111-111111111111";

async function createFollowUpVisit(
  app: Awaited<ReturnType<typeof buildTestApp>>,
  token: string,
) {
  const res = await app.inject({
    method: "POST",
    url: "/v1/follow-up-visits",
    payload: {
      patientId: PATIENT_ID,
      date: "2026-09-01T09:00:00.000Z",
      reason: "Follow-up check",
    },
    headers: auth(token),
  });
  expect(res.statusCode).toBe(201);
  return res.json();
}

describe("follow-up visits", () => {
  let app: Awaited<ReturnType<typeof buildTestApp>>;
  let token: string;

  beforeEach(async () => {
    app = await buildTestApp();
    token = await loginAsAdmin(app);
  });

  afterEach(async () => {
    await app.close();
  });

  it("creates a follow-up visit with status booked", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/v1/follow-up-visits",
      payload: { patientId: PATIENT_ID, date: "2026-09-01T09:00:00.000Z" },
      headers: auth(token),
    });

    expect(res.statusCode).toBe(201);
    const body = res.json();
    expect(body.id).toBeTruthy();
    expect(body.status).toBe("booked");
    expect(body.date).toBe("2026-09-01T09:00:00.000Z");
  });

  it("lists and gets follow-up visits", async () => {
    const created = await createFollowUpVisit(app, token);

    const list = await app.inject({
      method: "GET",
      url: "/v1/follow-up-visits",
      headers: auth(token),
    });
    expect(list.statusCode).toBe(200);
    expect(list.json()).toHaveLength(1);

    const get = await app.inject({
      method: "GET",
      url: `/v1/follow-up-visits/${created.id}`,
      headers: auth(token),
    });
    expect(get.statusCode).toBe(200);
    expect(get.json().id).toBe(created.id);
  });

  it("transitions booked → arrived → fulfilled", async () => {
    const created = await createFollowUpVisit(app, token);

    const arrived = await app.inject({
      method: "PATCH",
      url: `/v1/follow-up-visits/${created.id}`,
      payload: { status: "arrived" },
      headers: auth(token),
    });
    expect(arrived.statusCode).toBe(200);
    expect(arrived.json().status).toBe("arrived");

    const fulfilled = await app.inject({
      method: "PATCH",
      url: `/v1/follow-up-visits/${created.id}`,
      payload: { status: "fulfilled" },
      headers: auth(token),
    });
    expect(fulfilled.statusCode).toBe(200);
    expect(fulfilled.json().status).toBe("fulfilled");
  });

  it("rejects an invalid transition (booked → fulfilled) with 409", async () => {
    const created = await createFollowUpVisit(app, token);

    const res = await app.inject({
      method: "PATCH",
      url: `/v1/follow-up-visits/${created.id}`,
      payload: { status: "fulfilled" },
      headers: auth(token),
    });

    expect(res.statusCode).toBe(409);
  });

  it("allows booked → cancelled", async () => {
    const created = await createFollowUpVisit(app, token);

    const res = await app.inject({
      method: "PATCH",
      url: `/v1/follow-up-visits/${created.id}`,
      payload: { status: "cancelled" },
      headers: auth(token),
    });

    expect(res.statusCode).toBe(200);
    expect(res.json().status).toBe("cancelled");
  });

  it("returns 404 for an unknown follow-up visit", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/v1/follow-up-visits/unknown",
      headers: auth(token),
    });
    expect(res.statusCode).toBe(404);
  });
});
