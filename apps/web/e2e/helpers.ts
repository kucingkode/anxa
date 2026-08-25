import { expect, type APIRequestContext, type Page } from "@playwright/test";

const API_URL = process.env.VITE_API_URL ?? "http://localhost:3000";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@simk.dev";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "password123";

export interface TestUser {
  email: string;
  password: string;
  role: "doctor" | "paramedic" | "logistic_admin" | "admin";
}

let bootstrapCounter = 0;

async function getAdminToken(request: APIRequestContext): Promise<string> {
  const res = await request.post(`${API_URL}/v1/auth/login`, {
    data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
  });
  if (!res.ok()) {
    throw new Error(`Failed to login as admin: ${res.status()} ${await res.text()}`);
  }
  const body = (await res.json()) as { accessToken: string };
  return body.accessToken;
}

async function withRetry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < retries; i += 1) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 200 * (i + 1)));
    }
  }
  throw lastError;
}

/**
 * Creates a test user via the API using the seeded admin's token. If the user
 * already exists (409), that's treated as success.
 */
export async function ensureUser(request: APIRequestContext, user: TestUser): Promise<void> {
  await withRetry(async () => {
    const token = await getAdminToken(request);
    const rolesRes = await request.get(`${API_URL}/v1/roles`, {
      headers: { authorization: `Bearer ${token}` },
    });
    const roles = (await rolesRes.json()) as Array<{ id: string; name: string }>;
    const roleId = roles.find((r) => r.name === user.role)?.id;
    if (!roleId) throw new Error(`Role '${user.role}' not found`);

    const res = await request.post(`${API_URL}/v1/users`, {
      headers: { authorization: `Bearer ${token}` },
      data: { email: user.email, password: user.password, roleId },
    });
    if (!res.ok() && res.status() !== 409) {
      throw new Error(`Failed to seed user ${user.email}: ${res.status()} ${await res.text()}`);
    }
  });
}

/**
 * Returns a unique test user for the given role so parallel runs don't collide.
 */
export function uniqueUser(role: TestUser["role"]): TestUser {
  bootstrapCounter += 1;
  return {
    email: `e2e-${role}-${Date.now()}-${bootstrapCounter}@simk.dev`,
    password: "Password123!",
    role,
  };
}

/** Returns a unique, arbitrary identifier for entities that must not collide. */
export function uniqueIdentifier(prefix = "e2e"): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Logs in via the API and returns an access token for the given credentials. */
export async function getToken(request: APIRequestContext, email: string, password: string): Promise<string> {
  const res = await request.post(`${API_URL}/v1/auth/login`, { data: { email, password } });
  if (!res.ok()) throw new Error(`Login failed: ${res.status()} ${await res.text()}`);
  const body = (await res.json()) as { accessToken: string };
  return body.accessToken;
}

/** Creates a patient via the API and returns it (requires a paramedic/admin token). */
export async function createPatientApi(
  request: APIRequestContext,
  token: string,
  name: string,
  identifier: string,
): Promise<{ id: string }> {
  const res = await request.post(`${API_URL}/v1/patients`, {
    headers: { authorization: `Bearer ${token}` },
    data: { name, identifier, gender: "male" },
  });
  if (!res.ok()) throw new Error(`create patient failed: ${res.status()} ${await res.text()}`);
  return (await res.json()) as { id: string };
}

/**
 * Enqueues a patient and advances the queue to `in-service`, which creates a
 * visit. Returns the created visit id.
 */
export async function startVisitApi(request: APIRequestContext, token: string, patientId: string): Promise<string> {
  const queueRes = await request.post(`${API_URL}/v1/queues`, {
    headers: { authorization: `Bearer ${token}` },
    data: { patientId },
  });
  if (!queueRes.ok()) throw new Error(`create queue failed: ${queueRes.status()} ${await queueRes.text()}`);
  const queue = (await queueRes.json()) as { id: string; version: number };

  const updateRes = await request.patch(`${API_URL}/v1/queues/${queue.id}`, {
    headers: { authorization: `Bearer ${token}`, "If-Match": String(queue.version) },
    data: { status: "in-service" },
  });
  if (!updateRes.ok()) throw new Error(`start visit failed: ${updateRes.status()} ${await updateRes.text()}`);
  const updated = (await updateRes.json()) as { visitId: string };
  return updated.visitId;
}

export async function loginViaUi(page: Page, email: string, password: string) {
  await page.goto("/login");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Kata Sandi").fill(password);
  await page.getByRole("button", { name: "Masuk" }).click();
  await expect(page).toHaveURL("/");
}
