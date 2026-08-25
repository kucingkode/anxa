import type { BuildAppOptions } from "../../src/application/bootstrap.js";
import { buildApp } from "../../src/application/bootstrap.js";
import { seedRolesAndAdmin } from "../../src/application/seed.js";
import { MemoryDatabase } from "../../src/infrastructure/out/database/in-memory/database.js";
import type { MemoryTxContext } from "../../src/infrastructure/out/database/in-memory/database.js";
import { MemoryConditionsRepository } from "../../src/infrastructure/out/database/in-memory/conditions-repository.js";
import { MemoryConditionReferencesRepository } from "../../src/infrastructure/out/database/in-memory/condition-references-repository.js";
import { MemoryFollowUpVisitsRepository } from "../../src/infrastructure/out/database/in-memory/follow-up-visits-repository.js";
import { MemoryManufacturersRepository } from "../../src/infrastructure/out/database/in-memory/manufacturers-repository.js";
import { MemoryObservationsRepository } from "../../src/infrastructure/out/database/in-memory/observations-repository.js";
import { MemoryPatientsRepository } from "../../src/infrastructure/out/database/in-memory/patients-repository.js";
import { MemoryProceduresRepository } from "../../src/infrastructure/out/database/in-memory/procedures-repository.js";
import { MemoryProcedureReferencesRepository } from "../../src/infrastructure/out/database/in-memory/procedure-references-repository.js";
import { MemoryProductsRepository } from "../../src/infrastructure/out/database/in-memory/products-repository.js";
import { MemoryQueuesRepository } from "../../src/infrastructure/out/database/in-memory/queues-repository.js";
import { MemoryRefreshTokensRepository } from "../../src/infrastructure/out/database/in-memory/refresh-tokens-repository.js";
import { MemoryRolesRepository } from "../../src/infrastructure/out/database/in-memory/roles-repository.js";
import { MemoryUsersRepository } from "../../src/infrastructure/out/database/in-memory/users-repository.js";
import { MemoryVisitsRepository } from "../../src/infrastructure/out/database/in-memory/visits-repository.js";

export const ADMIN_EMAIL = "admin@simk.dev";
export const ADMIN_PASSWORD = "password123";

export async function buildTestApp(
  overrides: Partial<BuildAppOptions<MemoryTxContext>> = {},
) {
  const db = new MemoryDatabase();
  const usersRepository = new MemoryUsersRepository();
  const rolesRepository = new MemoryRolesRepository();

  await seedRolesAndAdmin({
    db,
    usersRepository,
    rolesRepository,
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    name: "Admin",
  });

  return buildApp({
    logger: false,
    db,
    patientsRepository: new MemoryPatientsRepository(),
    queuesRepository: new MemoryQueuesRepository(),
    visitsRepository: new MemoryVisitsRepository(),
    observationsRepository: new MemoryObservationsRepository(),
    conditionsRepository: new MemoryConditionsRepository(),
    proceduresRepository: new MemoryProceduresRepository(),
    followUpVisitsRepository: new MemoryFollowUpVisitsRepository(),
    usersRepository,
    rolesRepository,
    refreshTokensRepository: new MemoryRefreshTokensRepository(),
    productsRepository: new MemoryProductsRepository(),
    manufacturersRepository: new MemoryManufacturersRepository(),
    conditionReferencesRepository: new MemoryConditionReferencesRepository(),
    procedureReferencesRepository: new MemoryProcedureReferencesRepository(),
    jwtSecret: "test-secret",
    jwtExpiresIn: "5m",
    refreshTokenTtlSeconds: 604800,
    ...overrides,
  });
}

/** Logs in as the seeded admin and returns a Bearer access token. */
export async function loginAsAdmin(app: Awaited<ReturnType<typeof buildTestApp>>): Promise<string> {
  return login(app, ADMIN_EMAIL, ADMIN_PASSWORD);
}

/** Logs in with the given credentials and returns a Bearer access token. */
export async function login(
  app: Awaited<ReturnType<typeof buildTestApp>>,
  email: string,
  password: string,
): Promise<string> {
  const res = await app.inject({
    method: "POST",
    url: "/v1/auth/login",
    payload: { email, password },
  });
  return res.json().accessToken;
}

/** Returns the id of a seeded/system role by name (requires admin). */
export async function getRoleId(
  app: Awaited<ReturnType<typeof buildTestApp>>,
  roleName: string,
): Promise<string> {
  const token = await loginAsAdmin(app);
  const res = await app.inject({
    method: "GET",
    url: "/v1/roles",
    headers: auth(token),
  });
  const roles = res.json() as Array<{ id: string; name: string }>;
  const role = roles.find((r) => r.name === roleName);
  if (!role) throw new Error(`Role '${roleName}' not found`);
  return role.id;
}

/** Builds an Authorization header for the given token. */
export function auth(token: string): { authorization: string } {
  return { authorization: `Bearer ${token}` };
}
