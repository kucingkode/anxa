import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { auth, buildTestApp, getRoleId, login, loginAsAdmin } from "./utils/build-test-app.js";

describe("roles", () => {
  let app: Awaited<ReturnType<typeof buildTestApp>>;

  beforeEach(async () => {
    app = await buildTestApp();
  });

  afterEach(async () => {
    await app.close();
  });

  describe("GET /v1/roles", () => {
    it("lists the seeded classic roles", async () => {
      const token = await loginAsAdmin(app);
      const res = await app.inject({ method: "GET", url: "/v1/roles", headers: auth(token) });

      expect(res.statusCode).toBe(200);
      const names = res.json().map((r: { name: string }) => r.name);
      expect(names).toContain("admin");
      expect(names).toContain("doctor");
      expect(names).toContain("paramedic");
      expect(names).toContain("logistic_admin");
    });
  });

  describe("POST /v1/roles", () => {
    it("creates a custom role", async () => {
      const token = await loginAsAdmin(app);
      const res = await app.inject({
        method: "POST",
        url: "/v1/roles",
        headers: auth(token),
        payload: { name: "front-desk", permissions: ["patients:read", "queues:write"] },
      });

      expect(res.statusCode).toBe(201);
      expect(res.json().name).toBe("front-desk");
      expect(res.json().isSystem).toBe(false);
      expect(res.json().permissions).toContain("patients:read");
    });

    it("rejects an invalid permission with 400", async () => {
      const token = await loginAsAdmin(app);
      const res = await app.inject({
        method: "POST",
        url: "/v1/roles",
        headers: auth(token),
        payload: { name: "bad", permissions: ["nonsense:read"] },
      });

      expect(res.statusCode).toBe(400);
    });

    it("rejects a duplicate name with 409", async () => {
      const token = await loginAsAdmin(app);
      const res = await app.inject({
        method: "POST",
        url: "/v1/roles",
        headers: auth(token),
        payload: { name: "admin", permissions: [] },
      });

      expect(res.statusCode).toBe(409);
    });
  });

  describe("PATCH /v1/roles/:id", () => {
    it("updates a custom role", async () => {
      const token = await loginAsAdmin(app);
      const created = await app.inject({
        method: "POST",
        url: "/v1/roles",
        headers: auth(token),
        payload: { name: "front-desk", permissions: ["patients:read"] },
      });
      const { id } = created.json();

      const res = await app.inject({
        method: "PATCH",
        url: `/v1/roles/${id}`,
        headers: auth(token),
        payload: { permissions: ["patients:read", "patients:write"] },
      });

      expect(res.statusCode).toBe(200);
      expect(res.json().permissions).toContain("patients:write");
    });

    it("rejects modifying a system role with 409", async () => {
      const token = await loginAsAdmin(app);
      const adminRoleId = await getRoleId(app, "admin");

      const res = await app.inject({
        method: "PATCH",
        url: `/v1/roles/${adminRoleId}`,
        headers: auth(token),
        payload: { name: "superuser" },
      });

      expect(res.statusCode).toBe(409);
    });
  });

  describe("DELETE /v1/roles/:id", () => {
    it("rejects deleting a system role with 409", async () => {
      const token = await loginAsAdmin(app);
      const doctorRoleId = await getRoleId(app, "doctor");

      const res = await app.inject({
        method: "DELETE",
        url: `/v1/roles/${doctorRoleId}`,
        headers: auth(token),
      });

      expect(res.statusCode).toBe(409);
    });

    it("rejects deleting a role still assigned to users with 409", async () => {
      const token = await loginAsAdmin(app);
      const created = await app.inject({
        method: "POST",
        url: "/v1/roles",
        headers: auth(token),
        payload: { name: "temp", permissions: [] },
      });
      const { id } = created.json();

      await app.inject({
        method: "POST",
        url: "/v1/users",
        headers: auth(token),
        payload: { email: "temp@simk.dev", password: "password123", roleId: id },
      });

      const res = await app.inject({
        method: "DELETE",
        url: `/v1/roles/${id}`,
        headers: auth(token),
      });

      expect(res.statusCode).toBe(409);
    });

    it("deletes an unassigned custom role", async () => {
      const token = await loginAsAdmin(app);
      const created = await app.inject({
        method: "POST",
        url: "/v1/roles",
        headers: auth(token),
        payload: { name: "temp", permissions: [] },
      });
      const { id } = created.json();

      const res = await app.inject({
        method: "DELETE",
        url: `/v1/roles/${id}`,
        headers: auth(token),
      });

      expect(res.statusCode).toBe(204);
    });
  });

  describe("RBAC enforcement", () => {
    it("enforces custom-role permissions", async () => {
      const adminToken = await loginAsAdmin(app);

      const role = await app.inject({
        method: "POST",
        url: "/v1/roles",
        headers: auth(adminToken),
        payload: { name: "read-only-patients", permissions: ["patients:read"] },
      });
      const roleId = role.json().id;

      await app.inject({
        method: "POST",
        url: "/v1/users",
        headers: auth(adminToken),
        payload: { email: "reader@simk.dev", password: "password123", roleId },
      });

      const token = await login(app, "reader@simk.dev", "password123");

      const listRes = await app.inject({ method: "GET", url: "/v1/patients", headers: auth(token) });
      expect(listRes.statusCode).toBe(200);

      const createRes = await app.inject({
        method: "POST",
        url: "/v1/patients",
        headers: auth(token),
        payload: { name: "X", identifier: "999", gender: "male" },
      });
      expect(createRes.statusCode).toBe(403);
    });
  });
});
