# AGENTS.md — SIMK API Development Guide

## Overview

`apps/api` is the backend for SIMK (Sistem Informasi & Manajemen Klinik), a clinic
management system integrated with Indonesia SatuSehat (HL7 FHIR R4). Built with
**Fastify v5**, **Drizzle ORM** (PostgreSQL), **Hexagonal Architecture**, and
**contract-first OpenAPI 3.1**.

## Key documents

| Document | Location |
|---|---|
| PRD (requirements, roles, use cases) | `packages/contracts/docs/PRD.md` |
| OpenAPI spec (source of truth) | `packages/contracts/openapi/openapi.yaml` |
| Generated TS types | `packages/contracts/src/generated/schema.d.ts` |
| Contract type re-exports | `packages/contracts/src/index.ts` |

## Contract-first development

Every endpoint starts in the OpenAPI spec at `packages/contracts/openapi/`.
After editing spec files, regenerate types:

```
cd packages/contracts
pnpm generate     # runs openapi-typescript → src/generated/
```

Types are consumed via `@simk/contracts`:
```ts
import type { NewPatient, Patient } from "@simk/contracts";
```

The API serves the canonical OpenAPI spec through Swagger UI at `/docs`.

## Architecture: Hexagonal (Ports & Adapters)

```
src/
  domain/
    ports/in/           # Use-case interfaces (what the app *does*)
      patients/create-patient.ts
    ports/out/          # Outbound port interfaces (repository contracts, cache, etc.)
      database/patients-repository.ts
    errors/domain/      # DomainError subclasses (NotFoundError, ConflictError, …)
    [resource]/state-machine.ts  # Queue, Observation, FollowUpVisit state machines

  application/
    services/           # Use-case implementations (application logic)
      patients/create-patient.ts   # extends BaseUseCase
    bootstrap.ts        # Composition root — wires services, repos, adapters
    config.ts           # Env-based config loader

  infrastructure/
    in/rest/fastify/    # Inbound adapter (HTTP layer)
      routes/           # One route module per resource
      middleware/auth.ts # JWT verification + role guard
      deps.ts           # FastifyRestServerDeps type
      fastify.ts        # Registers all route modules
    out/
      database/drizzle/ # Drizzle ORM (Postgres)
        schema/         # One Drizzle table definition per DB table
        repositories/   # Drizzle*Repository implementations
      database/in-memory/ # In-memory repos for tests
      cache/            # RedisCache + MemoryCache
      satusehat/        # SatuSehat FHIR adapter

  shared/classes/       # BaseUseCase, BaseAdapter
  observability/        # Pino logger
  constants.ts          # Port names, use-case names
```

### Layer rules

- `domain/ports/in/` defines a **plain TS type** (e.g., `CreatePatientUseCase`), never a class.
- `application/services/` **implements** the port interface, extends `BaseUseCase`.
- `infrastructure/out/database/drizzle/repositories/` **implements** the outbound port,
  extends `BaseAdapter`.
- `application/services/` never imports from `infrastructure/` — it only depends on
  domain port types. Wiring happens in `bootstrap.ts`.
- All DB operations go through `this.db.beginTx(ctx => repo.someMethod(ctx, …))`.

## Test-driven development

### Test infrastructure

| File | Purpose |
|---|---|
| `test/utils/build-test-app.ts` | Builds Fastify instance with in-memory repos |
| `test/setup.ts` | Silences logger |

`buildTestApp()` injects `Memory*Repository` implementations so tests run without
a database. The test app is a fully functional Fastify instance — tests call
`app.inject()` to simulate HTTP requests.

### Writing tests

Tests live in `test/<resource>.test.ts`. Pattern:

```ts
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { buildTestApp } from "./utils/build-test-app.js";

describe("resource", () => {
  let app: ReturnType<typeof buildTestApp>;

  beforeEach(() => { app = buildTestApp(); });
  afterEach(async () => { await app.close(); });

  it("does something", async () => {
    const res = await app.inject({ method: "POST", url: "/v1/resource", payload: {...} });
    expect(res.statusCode).toBe(201);
  });
});
```

Run: `pnpm test` (or `npx vitest run`)

### TDD workflow for new features

1. **PRD** — Confirm the use case, role, and acceptance criteria in `packages/contracts/docs/PRD.md`.
2. **Contract** — Add/update the endpoint and schemas in `packages/contracts/openapi/`.
   Run `pnpm generate` in the contracts package.
3. **DB Schema** — Add a Drizzle table in `src/infrastructure/out/database/drizzle/schema/`,
   re-export in `schema.ts`. Run `pnpm db:generate` to create a migration.
4. **Domain ports** — Define `in/` use-case interface and `out/` repository interface.
   Add port/use-case name constants to `constants.ts`.
5. **Domain errors** — Add error classes in `domain/errors/domain/` as needed.
   Map HTTP status codes in `error-http-status-codes.ts`.
6. **In-memory repo** — Implement the repository in `in-memory/` first (no DB needed).
   Add to `test/utils/build-test-app.ts`.
7. **Test** — Write the test file against the in-memory repo. Tests should fail
   (red) at this point.
8. **Use-case service** — Implement in `application/services/`. Re-run tests (green).
9. **Drizzle repo** — Implement in `drizzle/repositories/`. Wire into `bootstrap.ts`.
10. **Routes** — Add route module in `infrastructure/in/rest/fastify/routes/`.
    Register in `fastify.ts`. Update `deps.ts` with any new use-case types.
11. **Auth** — Add `preHandler: [auth, requireRole("admin")]` per the PRD role matrix.
    For new authenticated resources, the test setup must login first to get a token.
12. **Verification** — Run `pnpm test`, then `pnpm typecheck`. Both must pass.

### Auth in tests

Resources that require authentication need a pre-seeded user and a valid JWT:

```ts
// Create first user (no auth needed — first-user bootstrap)
await app.inject({ method: "POST", url: "/v1/users", payload: {
  email: "admin@simk.dev", password: "password123", role: "admin",
}});

// Login to get token
const loginRes = await app.inject({ method: "POST", url: "/v1/auth/login",
  payload: { email: "admin@simk.dev", password: "password123" },
});
const token = loginRes.json().accessToken;

// Use in subsequent requests
const res = await app.inject({ method: "GET", url: "/v1/resource",
  headers: { authorization: `Bearer ${token}` },
});
```

The first `POST /v1/users` is allowed without authentication (bootstrapping).
All subsequent user operations require an admin token.

### Session management (cookie + opaque refresh token)

- `POST /v1/auth/login` returns a short-lived (default `5m`) JWT access token in the
  body and sets an **opaque refresh token** in an **httpOnly cookie**
  (`simk_refresh_token`).
- Only the SHA-256 hash of the refresh token is stored in the `refresh_tokens` table
  (`RefreshTokensRepository`). The raw token never touches the database.
- `POST /v1/auth/refresh` hashes the presented token, looks it up (checking expiry +
  revocation), and issues a new access token while **rotating** the refresh token
  (revoking the old hash, creating a new one). The frontend calls this on every page
  load and never stores the access token in localStorage.
- `POST /v1/auth/logout` clears the cookie and revokes the refresh token by hash
  (no auth required, so logout always succeeds).
- Access tokens are JWTs with a `type: "access"` claim; `VerifyTokenService` rejects
  any JWT carrying `type: "refresh"`.

## Commands

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server with hot-reload (tsx watch) |
| `pnpm test` | Run vitest suite |
| `pnpm typecheck` | TypeScript check (`tsc --noEmit`) |
| `pnpm build` | Build for production (tsup) |
| `pnpm db:generate` | Generate migration from Drizzle schema changes |
| `pnpm migrate` | Run migrations against the DB |

## Role-based access control (dynamic RBAC)

Access is controlled by **roles** that bundle `resource:action` permissions
(`read` / `write` / `delete`), e.g. `patients:write`. Admins can create custom roles
via `POST /v1/roles`; users reference a role via `roleId`.

| Seeded role | Permissions |
|---|---|
| `doctor` | patients:read, visits:read, follow-up-visits/observations/conditions/procedures `*` |
| `paramedic` | patients `*`, queues `*`, visits:read |
| `logistic_admin` | products `*`, manufacturers `*` |
| `admin` | everything (all `resource:action`) |

Permissions are defined in `domain/permissions.ts`. Route protection uses
`requirePermission` with a `permission(resource, action)` string:

```ts
import { permission } from "../../../../../domain/permissions.js";
import { createAuthMiddleware, requirePermission } from "../middleware/auth.js";

const auth = createAuthMiddleware({ verifyTokenService, getAuthUserService });
const canWrite = requirePermission(permission("patients", "write"));
app.post("/", { preHandler: [auth, canWrite] }, handler);
```

The auth middleware verifies the JWT (yielding `userId`), then loads the user's role
via `GetAuthUserService` so permission changes take effect immediately.