# SIMK — Sistem Informasi & Manajemen Klinik

Monorepo for a clinic information & management system integrated with
[Indonesia SatuSehat](https://satusehat.kemkes.go.id) (HL7 FHIR R4).

## Documentation

- [PRD (MVP)](packages/contracts/docs/PRD.md) — product requirements & use cases.
- [SatuSehat integration notes](packages/contracts/docs/satusehat/README.md) — scraped FHIR R4 / API reference.

## Stack

| Module     | Path              | Tech                                        |
| ---------- | ----------------- | ------------------------------------------- |
| `contracts`| `packages/contracts` | OpenAPI 3.1 (source of truth) + generated types + typed client |
| `api`      | `apps/api`        | Node.js + TypeScript + Fastify + Vitest      |
| `web`      | `apps/web`        | React + TypeScript + Vite + Vitest + Testing Library |

## Principles

- **Contract-first** — `packages/contracts/openapi/openapi.yaml` is the single
  source of truth. Types and API clients are generated from it.
- **Test-driven development** — write a failing test, then implement.
- **SatuSehat integration** — `apps/api/src/integrations/satusehat/` is the
  seam for the FHIR R4 client (OAuth2 client-credentials → REST).

## Getting started

```bash
pnpm install          # install all workspaces
pnpm generate         # regenerate contracts (types + openapi.json)
pnpm typecheck        # typecheck everything
pnpm test             # run all tests (TDD loop)
pnpm dev              # run api + web in parallel
pnpm build            # build all packages
```

Individual workspaces:

```bash
pnpm --filter @simk/contracts generate
pnpm --filter @simk/api test:watch
pnpm --filter @simk/web dev
```

## Development workflow

1. **Change the contract** — edit `packages/contracts/openapi/openapi.yaml`.
2. **Regenerate** — `pnpm generate` (produces `schema.d.ts` types + `openapi.json`).
3. **Implement in `api`** — the route handlers are typed against the generated types.
4. **Consume in `web`** — use the generated `createApiClient()`.

## Environment

See `.env.example` in `apps/api` and `apps/web`.

## Layout

```
apps/
  api/          Fastify backend (TDD with Vitest + fastify.inject)
  web/          React frontend (TDD with Vitest + Testing Library)
packages/
  contracts/    OpenAPI 3.1 spec + generated types + openapi-fetch client
```
