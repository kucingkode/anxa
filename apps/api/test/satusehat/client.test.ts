import { describe, expect, it, vi } from "vitest";
import type { Patient } from "@simk/contracts";
import { HttpSatuSehat } from "../../src/infrastructure/out/satusehat/http-satuSehat.js";
import type { SatuSehatConfig } from "../../src/application/config.js";
import { NIK_SYSTEM } from "../../src/infrastructure/out/satusehat/fhir/patient.js";

const config: SatuSehatConfig = {
  baseUrl: "https://api-satusehat.kemkes.go.id/fhir-r4/v1",
  authUrl: "https://api-satusehat.kemkes.go.id/oauth2/v1",
  clientId: "client-id",
  clientSecret: "client-secret",
  organizationId: "org-id",
};

const patient: Patient = {
  id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
  name: "Budi Santoso",
  identifier: "3273010101010001",
  gender: "male",
  createdAt: "2026-08-19T00:00:00.000Z",
};

type Call = { url: string; init?: RequestInit };

function mockFetch(responses: Response | Response[]): { fn: typeof fetch; calls: Call[] } {
  const queue = Array.isArray(responses) ? [...responses] : [responses];
  const calls: Call[] = [];
  const fn = (async (url: Parameters<typeof fetch>[0], init?: Parameters<typeof fetch>[1]) => {
    calls.push({ url: String(url), init });
    return queue.shift() ?? new Response("{}", { status: 500 });
  }) as typeof fetch;
  return { fn, calls };
}

describe("HttpSatuSehat", () => {
  it("authenticates via client-credentials and returns the access token", async () => {
    const { fn, calls } = mockFetch(new Response(JSON.stringify({ access_token: "tok" }), { status: 200 }));
    const client = new HttpSatuSehat(config, fn);

    await expect(client.authenticate()).resolves.toBe("tok");
    expect(calls).toHaveLength(1);
    expect(calls[0]?.url).toBe(
      "https://api-satusehat.kemkes.go.id/oauth2/v1/accesstoken?grant_type=client_credentials",
    );
    expect(calls[0]?.init?.method).toBe("POST");
    expect(String(calls[0]?.init?.body)).toContain("client_id=client-id");
    expect(String(calls[0]?.init?.body)).toContain("client_secret=client-secret");
  });

  it("caches the access token across calls", async () => {
    const { fn, calls } = mockFetch(new Response(JSON.stringify({ access_token: "tok" }), { status: 200 }));
    const client = new HttpSatuSehat(config, fn);

    await client.getAccessToken();
    await client.getAccessToken();

    expect(calls).toHaveLength(1);
  });

  it("submits a FHIR R4 Patient and returns the assigned IHS id", async () => {
    const { fn, calls } = mockFetch([
      new Response(JSON.stringify({ access_token: "tok" }), { status: 200 }),
      new Response(JSON.stringify({ id: "P000123" }), { status: 201 }),
    ]);
    const client = new HttpSatuSehat(config, fn);

    await expect(client.createPatient(patient)).resolves.toBe("P000123");

    const createCall = calls.find((c) => c.url.endsWith("/Patient"));
    expect(createCall).toBeDefined();
    expect(createCall?.init?.method).toBe("POST");
    expect(createCall?.init?.headers).toMatchObject({
      Authorization: "Bearer tok",
      "Content-Type": "application/json",
    });

    const body = JSON.parse(String(createCall?.init?.body));
    expect(body.resourceType).toBe("Patient");
    expect(body.identifier[0]).toMatchObject({ system: NIK_SYSTEM, value: patient.identifier });
  });

  it("throws when authentication is rejected", async () => {
    const { fn } = mockFetch(new Response("{}", { status: 401 }));
    const client = new HttpSatuSehat(config, fn);

    await expect(client.authenticate()).rejects.toThrow(/authentication failed/);
  });

  it("throws when createPatient is rejected", async () => {
    const { fn } = mockFetch([
      new Response(JSON.stringify({ access_token: "tok" }), { status: 200 }),
      new Response(JSON.stringify({ resourceType: "OperationOutcome" }), { status: 422 }),
    ]);
    const client = new HttpSatuSehat(config, fn);

    await expect(client.createPatient(patient)).rejects.toThrow(/createPatient failed/);
  });

  it("reports disabled when credentials are missing", () => {
    const client = new HttpSatuSehat({ ...config, clientId: "", clientSecret: "" });
    expect(client.enabled).toBe(false);
  });
});
