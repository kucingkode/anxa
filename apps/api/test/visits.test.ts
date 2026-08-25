import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { auth, buildTestApp, loginAsAdmin } from "./utils/build-test-app.js";

async function createPatient(
  app: Awaited<ReturnType<typeof buildTestApp>>,
  token: string,
) {
  const res = await app.inject({
    method: "POST",
    url: "/v1/patients",
    payload: { name: "Budi Santoso", identifier: "3273010101010001", gender: "male" },
    headers: auth(token),
  });
  return res.json();
}

async function enqueueAndServe(
  app: Awaited<ReturnType<typeof buildTestApp>>,
  token: string,
  patientId: string,
) {
  const queueRes = await app.inject({
    method: "POST",
    url: "/v1/queues",
    payload: { patientId },
    headers: auth(token),
  });
  const queue = queueRes.json();

  const transition = await app.inject({
    method: "PATCH",
    url: `/v1/queues/${queue.id}`,
    headers: { ...auth(token), "if-match": "0" },
    payload: { status: "in-service" },
  });

  return { queue: transition.json() };
}

describe("visits", () => {
  let app: Awaited<ReturnType<typeof buildTestApp>>;
  let token: string;

  beforeEach(async () => {
    app = await buildTestApp();
    token = await loginAsAdmin(app);
  });

  afterEach(async () => {
    await app.close();
  });

  it("creates a visit when a queue reaches in-service", async () => {
    const patient = await createPatient(app, token);
    const { queue } = await enqueueAndServe(app, token, patient.id);

    expect(queue.visitId).toBeTruthy();

    const visits = await app.inject({
      method: "GET",
      url: "/v1/visits",
      headers: auth(token),
    });
    expect(visits.statusCode).toBe(200);
    expect(visits.json()).toHaveLength(1);
    expect(visits.json()[0].status).toBe("arrived");
    expect(visits.json()[0].patientId).toBe(patient.id);
  });

  it("returns a visit by id", async () => {
    const patient = await createPatient(app, token);
    const { queue } = await enqueueAndServe(app, token, patient.id);

    const res = await app.inject({
      method: "GET",
      url: `/v1/visits/${queue.visitId}`,
      headers: auth(token),
    });
    expect(res.statusCode).toBe(200);
    expect(res.json().id).toBe(queue.visitId);
  });

  it("lists a patient's visits via the nested route", async () => {
    const patient = await createPatient(app, token);
    await enqueueAndServe(app, token, patient.id);

    const res = await app.inject({
      method: "GET",
      url: `/v1/patients/${patient.id}/visits`,
      headers: auth(token),
    });

    expect(res.statusCode).toBe(200);
    expect(res.json()).toHaveLength(1);
    expect(res.json()[0].patientId).toBe(patient.id);
  });

  it("marks the visit finished when the queue completes", async () => {
    const patient = await createPatient(app, token);
    const { queue } = await enqueueAndServe(app, token, patient.id);

    await app.inject({
      method: "PATCH",
      url: `/v1/queues/${queue.id}`,
      headers: { ...auth(token), "if-match": "1" },
      payload: { status: "done" },
    });

    const res = await app.inject({
      method: "GET",
      url: `/v1/visits/${queue.visitId}`,
      headers: auth(token),
    });
    expect(res.statusCode).toBe(200);
    expect(res.json().status).toBe("finished");
  });

  it("returns 404 for an unknown visit", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/v1/visits/unknown",
      headers: auth(token),
    });
    expect(res.statusCode).toBe(404);
  });
});
