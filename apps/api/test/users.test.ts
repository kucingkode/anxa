import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  auth,
  buildTestApp,
  getRoleId,
  loginAsAdmin,
} from "./utils/build-test-app.js";

describe("users", () => {
  let app: Awaited<ReturnType<typeof buildTestApp>>;

  beforeEach(async () => {
    app = await buildTestApp();
  });

  afterEach(async () => {
    await app.close();
  });

  describe("POST /v1/users", () => {
    it("creates a user and returns 201", async () => {
      const token = await loginAsAdmin(app);
      const doctorRoleId = await getRoleId(app, "doctor");

      const res = await app.inject({
        method: "POST",
        url: "/v1/users",
        payload: {
          name: "New Doctor",
          email: "doctor@simk.dev",
          password: "password123",
          roleId: doctorRoleId,
        },
        headers: auth(token),
      });

      expect(res.statusCode).toBe(201);
      const user = res.json();
      expect(user.email).toBe("doctor@simk.dev");
      expect(user.roleId).toBe(doctorRoleId);
      expect(user).not.toHaveProperty("password");
      expect(user).not.toHaveProperty("passwordHash");
    });

    it("rejects duplicate email with 409", async () => {
      const token = await loginAsAdmin(app);
      const paramedicRoleId = await getRoleId(app, "paramedic");

      await app.inject({
        method: "POST",
        url: "/v1/users",
        payload: { email: "dup@simk.dev", password: "password123", roleId: paramedicRoleId },
        headers: auth(token),
      });

      const res = await app.inject({
        method: "POST",
        url: "/v1/users",
        payload: { email: "dup@simk.dev", password: "password123", roleId: paramedicRoleId },
        headers: auth(token),
      });

      expect(res.statusCode).toBe(409);
    });
  });

  describe("GET /v1/users", () => {
    it("lists users", async () => {
      const token = await loginAsAdmin(app);

      const res = await app.inject({
        method: "GET",
        url: "/v1/users",
        headers: auth(token),
      });

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.json())).toBe(true);
      expect(res.json().length).toBeGreaterThan(0);
    });

    it("filters by role", async () => {
      const token = await loginAsAdmin(app);
      const doctorRoleId = await getRoleId(app, "doctor");

      await app.inject({
        method: "POST",
        url: "/v1/users",
        payload: { email: "doc@simk.dev", password: "password123", roleId: doctorRoleId },
        headers: auth(token),
      });

      const res = await app.inject({
        method: "GET",
        url: `/v1/users?roleId=${doctorRoleId}`,
        headers: auth(token),
      });

      expect(res.statusCode).toBe(200);
      const users = res.json();
      expect(users.length).toBeGreaterThan(0);
      for (const user of users) {
        expect(user.roleId).toBe(doctorRoleId);
      }
    });
  });

  describe("GET /v1/users/:id", () => {
    it("returns a user by id", async () => {
      const token = await loginAsAdmin(app);
      const paramedicRoleId = await getRoleId(app, "paramedic");

      const createRes = await app.inject({
        method: "POST",
        url: "/v1/users",
        payload: { email: "update@simk.dev", password: "password123", roleId: paramedicRoleId },
        headers: auth(token),
      });
      const id = createRes.json().id;

      const res = await app.inject({
        method: "GET",
        url: `/v1/users/${id}`,
        headers: auth(token),
      });

      expect(res.statusCode).toBe(200);
      expect(res.json().id).toBe(id);
    });

    it("returns 404 for non-existent user", async () => {
      const token = await loginAsAdmin(app);

      const res = await app.inject({
        method: "GET",
        url: "/v1/users/nonexistent-id",
        headers: auth(token),
      });

      expect(res.statusCode).toBe(404);
    });
  });

  describe("PATCH /v1/users/:id", () => {
    it("updates a user", async () => {
      const token = await loginAsAdmin(app);
      const paramedicRoleId = await getRoleId(app, "paramedic");

      const createRes = await app.inject({
        method: "POST",
        url: "/v1/users",
        payload: { email: "update@simk.dev", password: "password123", roleId: paramedicRoleId },
        headers: auth(token),
      });
      const id = createRes.json().id;

      const res = await app.inject({
        method: "PATCH",
        url: `/v1/users/${id}`,
        payload: { name: "Updated Name" },
        headers: auth(token),
      });

      expect(res.statusCode).toBe(200);
      expect(res.json().name).toBe("Updated Name");
    });
  });

  describe("DELETE /v1/users/:id", () => {
    it("deletes a user and returns 204", async () => {
      const token = await loginAsAdmin(app);
      const paramedicRoleId = await getRoleId(app, "paramedic");

      const createRes = await app.inject({
        method: "POST",
        url: "/v1/users",
        payload: { email: "delete@simk.dev", password: "password123", roleId: paramedicRoleId },
        headers: auth(token),
      });
      const id = createRes.json().id;

      const res = await app.inject({
        method: "DELETE",
        url: `/v1/users/${id}`,
        headers: auth(token),
      });

      expect(res.statusCode).toBe(204);
    });

    it("returns 409 when admin tries to delete themselves", async () => {
      const token = await loginAsAdmin(app);

      const listRes = await app.inject({
        method: "GET",
        url: "/v1/users",
        headers: auth(token),
      });
      const adminId = listRes.json()[0].id;

      const res = await app.inject({
        method: "DELETE",
        url: `/v1/users/${adminId}`,
        headers: auth(token),
      });

      expect(res.statusCode).toBe(409);
    });
  });
});
