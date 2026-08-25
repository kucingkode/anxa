# AGENTS.md — SIMK Monorepo

SIMK (Sistem Informasi & Manajemen Klinik) is a clinic management system
integrated with Indonesia [SatuSehat](https://satusehat.kemkes.go.id) (HL7 FHIR R4).

## Repository map

```
simk/
  apps/
    api/          # @simk/api  — Fastify v5 backend, Drizzle ORM + PostgreSQL
    web/          # @simk/web  — React v19 frontend, Vite
  packages/
    contracts/    # @simk/contracts — OpenAPI 3.1 spec + generated TS types
  PRD.md          # Product requirements (in packages/contracts/docs/)
```

**Package manager:** pnpm v10 with workspaces (`pnpm-workspace.yaml`).
**Orchestration:** Turborepo (`turbo.json`).
**TypeScript:** strict, ES2022 target, bundler module resolution.

## Monorepo commands

| Command | What it does |
|---|---|
| `pnpm install` | Install all workspace dependencies |
| `pnpm dev` | Start all apps in dev mode (api + web) |
| `pnpm build` | Build all packages and apps |
| `pnpm test` | Run all test suites |
| `pnpm typecheck` | TypeScript check across the entire repo |

Per-package commands use pnpm filtering:
```
pnpm --filter @simk/api test
pnpm --filter @simk/contracts generate
```

## Contract-first workflow

The **source of truth** is `packages/contracts/openapi/openapi.yaml` (and split
files under `openapi/paths/` and `openapi/components/`).

### Adding or changing an endpoint

1. Edit YAML files in `packages/contracts/openapi/`.
2. Regenerate types: `cd packages/contracts && pnpm generate`
   (runs `openapi-typescript` → `src/generated/schema.d.ts` + `openapi.json`).
3. Type re-exports live in `packages/contracts/src/index.ts`.
4. Both `@simk/api` and `@simk/web` import from `@simk/contracts`:
   ```ts
   import type { Patient, NewPatient } from "@simk/contracts";
   ```

### OpenAPI spec structure

```
openapi/
  openapi.yaml              # Root: info, servers, security, tag → path refs
  components/
    headers.yaml            # x-request-id
    parameters.yaml         # Limit, IfMatch
    responses.yaml          # Standard error responses (400–500)
    schemas/                # One .yaml per schema (Patient, Queue, …)
  paths/
    v1/                     # One .yaml per resource (patients.yaml, …)
```

## Architecture principles

### Contract-first
Every API change starts in `packages/contracts/openapi/`. No endpoint exists
without a matching OpenAPI path + schema.

### Hexagonal backend
`apps/api` uses Ports & Adapters. See `apps/api/AGENTS.md` for the full layer
diagram and TDD workflow.

### Test-driven
Tests live alongside code in each package. The backend uses in-memory
repositories so tests run without a database. Run `pnpm test` before committing.

### Typed full-stack
`@simk/contracts` exports a typed fetch client. Both backend and frontend
share request/response types, preventing drift between API and UI.

## Quick start

```sh
pnpm install
pnpm generate     # build contracts
pnpm dev          # start api + web
```

## Key resources

| Resource | Location |
|---|---|
| PRD (roles, use cases, state machines) | `packages/contracts/docs/PRD.md` |
| API development guide | `apps/api/AGENTS.md` |
| SatuSehat integration notes | `packages/contracts/docs/satusehat/README.md` |
| OpenAPI spec | `packages/contracts/openapi/openapi.yaml` |
| Swagger UI (when api is running) | `http://localhost:3000/docs` |