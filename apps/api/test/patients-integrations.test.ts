import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { NewPatient } from "@simk/contracts";
import type { Cache } from "../src/domain/ports/out/cache.js";
import type { SatuSehat } from "../src/domain/ports/out/satuSehat.js";
import { auth, buildTestApp, loginAsAdmin } from "./utils/build-test-app.js";

const patientKey = (id: string) => `patients:${id}`;

class SpyCache implements Cache {
  readonly data = new Map<string, string>();
  setCalls: string[] = [];
  getCalls: string[] = [];
  deleteCalls: string[] = [];

  async set(key: string, value: string): Promise<void> {
    this.setCalls.push(key);
    this.data.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    this.getCalls.push(key);
    return this.data.get(key) ?? null;
  }

  async delete(key: string): Promise<void> {
    this.deleteCalls.push(key);
    this.data.delete(key);
  }

  async clear(): Promise<void> {
    this.data.clear();
  }
}

const newPatient: NewPatient = {
  name: "Budi Santoso",
  identifier: "3273010101010001",
  gender: "male",
};

describe("patients — cache & SatuSehat wiring", () => {
  describe("cache (read-through + invalidation)", () => {
    let app: Awaited<ReturnType<typeof buildTestApp>>;
    let cache: SpyCache;
    let token: string;

    beforeEach(async () => {
      cache = new SpyCache();
      app = await buildTestApp({ cache });
      token = await loginAsAdmin(app);
    });

    afterEach(async () => {
      await app.close();
    });

    it("caches on first get and serves subsequent gets from cache", async () => {
      const created = await app.inject({
        method: "POST",
        url: "/v1/patients",
        headers: auth(token),
        payload: newPatient,
      });
      const { id } = created.json();

      const first = await app.inject({ method: "GET", url: `/v1/patients/${id}`, headers: auth(token) });
      expect(first.statusCode).toBe(200);
      expect(cache.setCalls).toContain(patientKey(id));

      const setCountAfterFirst = cache.setCalls.length;
      const second = await app.inject({ method: "GET", url: `/v1/patients/${id}`, headers: auth(token) });
      expect(second.statusCode).toBe(200);
      expect(cache.getCalls).toContain(patientKey(id));
      expect(cache.setCalls.length).toBe(setCountAfterFirst);
    });

    it("invalidates the cache entry on update", async () => {
      const created = await app.inject({
        method: "POST",
        url: "/v1/patients",
        headers: auth(token),
        payload: newPatient,
      });
      const { id } = created.json();

      await app.inject({ method: "GET", url: `/v1/patients/${id}`, headers: auth(token) });
      const setCount = cache.setCalls.length;

      const patch = await app.inject({
        method: "PATCH",
        url: `/v1/patients/${id}`,
        headers: auth(token),
        payload: { name: "Budi Santoso Jr." },
      });
      expect(patch.statusCode).toBe(200);
      expect(cache.deleteCalls).toContain(patientKey(id));

      await app.inject({ method: "GET", url: `/v1/patients/${id}`, headers: auth(token) });
      expect(cache.setCalls.length).toBe(setCount + 1);
    });

    it("invalidates the cache entry on delete", async () => {
      const created = await app.inject({
        method: "POST",
        url: "/v1/patients",
        headers: auth(token),
        payload: newPatient,
      });
      const { id } = created.json();

      await app.inject({ method: "GET", url: `/v1/patients/${id}`, headers: auth(token) });

      const del = await app.inject({ method: "DELETE", url: `/v1/patients/${id}`, headers: auth(token) });
      expect(del.statusCode).toBe(204);
      expect(cache.deleteCalls).toContain(patientKey(id));
    });
  });

  describe("SatuSehat submission (best-effort)", () => {
    it("submits the patient to SatuSehat when enabled", async () => {
      const satuSehat: SatuSehat = {
        enabled: true,
        authenticate: vi.fn(async () => "tok"),
        createPatient: vi.fn(async () => "IHS123"),
      };

      const app = await buildTestApp({ satuSehat });
      const token = await loginAsAdmin(app);

      const res = await app.inject({
        method: "POST",
        url: "/v1/patients",
        headers: auth(token),
        payload: newPatient,
      });

      expect(res.statusCode).toBe(201);
      expect(satuSehat.createPatient).toHaveBeenCalledTimes(1);

      await app.close();
    });

    it("still succeeds when SatuSehat submission fails", async () => {
      const satuSehat: SatuSehat = {
        enabled: true,
        authenticate: vi.fn(async () => "tok"),
        createPatient: vi.fn(async () => {
          throw new Error("SatuSehat down");
        }),
      };

      const app = await buildTestApp({ satuSehat });
      const token = await loginAsAdmin(app);

      const res = await app.inject({
        method: "POST",
        url: "/v1/patients",
        headers: auth(token),
        payload: newPatient,
      });

      expect(res.statusCode).toBe(201);
      expect(satuSehat.createPatient).toHaveBeenCalledTimes(1);

      await app.close();
    });
  });
});
