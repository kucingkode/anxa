# AGENTS.md — SIMK Web Development Guide

## Overview

`apps/web` is the frontend for SIMK, a clinic management system. Built with
**React 19**, **Vite 6**, **TanStack Router**, **TanStack Query**, **Tailwind CSS**,
**shadcn/ui**, and **Lucide** icons. Uses a **feature-based architecture** and
**contract-first** typed API client from `@simk/contracts`.

## Key documents

| Document | Location |
|---|---|
| PRD (requirements, roles, use cases) | `packages/contracts/docs/PRD.md` |
| OpenAPI spec (source of truth) | `packages/contracts/openapi/openapi.yaml` |
| Generated TS types | `packages/contracts/src/generated/schema.d.ts` |
| Contract type re-exports | `packages/contracts/src/index.ts` |
| API development guide | `apps/api/AGENTS.md` |

## Architecture: Feature-based

```
src/
  components/
    layout/
      app-layout.tsx       # Sidebar + header shell with role-based nav
    ui/                     # shadcn/ui primitives (Button, Card, Input, Label)

  features/
    auth/
      api/login.ts          # Raw API function (POST /v1/auth/login)
      hooks/use-login.ts    # TanStack Query useMutation wrapper
      components/login-form.tsx   # UI component
      __tests__/login-form.test.tsx

    patients/               # Next feature to build — same pattern
      api/                  # Raw API functions
      hooks/                # useQuery / useMutation wrappers
      components/           # UI components
      __tests__/

  lib/
    api.ts                  # Typed openapi-fetch client with auto auth header
    auth.tsx                # AuthProvider context + useAuth hook
    query-client.ts         # TanStack QueryClient with defaults
    utils.ts                # cn() helper (clsx + tailwind-merge)
    __tests__/

  routes/                   # TanStack Router file-based routes
    __root.tsx              # Root route (Outlet only)
    _authenticated.tsx      # Layout route — auth guard via beforeLoad
    _authenticated/index.tsx  # Dashboard (/) — role-aware
    login.tsx               # Login page (/login) — unauthenticated

  test/
    setup.ts                # @testing-library/jest-dom matchers
    test-utils.tsx           # renderWithProviders helper

  App.tsx                   # QueryClientProvider → AuthProvider → RouterProvider
  main.tsx                  # Entry point, imports index.css
  index.css                 # Tailwind directives + shadcn CSS variables
  routeTree.gen.ts          # Auto-generated from routes/ (git-ignored equivalent)
```

### Architecture principles

| Principle | Implementation |
|---|---|
| Feature-based | Each domain has its own `features/<name>/` with `api/`, `hooks/`, `components/`, `__tests__/` |
| Shared UI | Generic components (Button, Card, etc.) live in `components/ui/` |
| Shared infra | Router, query client, auth context, API client live in `lib/` |
| File-based routing | Routes in `src/routes/` auto-generate `routeTree.gen.ts` via `@tanstack/router-plugin/vite` |
| Typed API calls | `lib/api.ts` wraps `@simk/contracts` createApiClient with auto `Bearer` header injection |
| Secure auth | Access token held in-memory only; refresh token in an httpOnly cookie; session restored on every page load via `POST /v1/auth/refresh` |

### Layer rules

- `features/<name>/api/` exports **raw fetch functions** that call `api.GET` / `api.POST` etc.
  These never import React — they are pure data-access functions.
- `features/<name>/hooks/` exports **TanStack Query hooks** (`useQuery`, `useMutation`).
  These import from `features/<name>/api/` and wrap the raw calls with caching, invalidation, etc.
- `features/<name>/components/` exports **React components** that import hooks and render UI.
- `features/<name>/__tests__/` tests components via `@testing-library/react`, mocking hooks as needed.
- `lib/` does not import from `features/`. `features/` may import from `lib/` and `components/ui/`.
- `routes/` pages import from `features/<name>/components/` and render them.

## Contract-first workflow

All API types come from `@simk/contracts`. No manual type definitions for request/response shapes.

```ts
import type { Patient, LoginRequest } from "@simk/contracts";
import { api } from "@/lib/api";

const { data } = await api.GET("/v1/patients");
// data is typed: Patient[] | undefined
```

The API client is configured at `src/lib/api.ts` with `credentials: "include"`
and an interceptor that attaches `Authorization: Bearer <token>` from the in-memory
token store (`src/lib/token-store.ts`) to every outgoing request. The access token
is never persisted to localStorage.

## Auth flow

1. `AuthProvider` mounts and calls `POST /v1/auth/refresh` (the httpOnly refresh cookie
   is sent automatically via `credentials: "include"`).
2. Success → the new access token is stored in-memory (`token-store.ts`) and the user
   is set in React state. Failure → unauthenticated.
3. `AuthProvider` renders `null` (loading) until the refresh resolves, then renders the
   router — so route guards can trust the in-memory token.
4. `_authenticated` layout `beforeLoad` checks `getAccessToken()`; missing → redirect `/login`.
5. Login form → `POST /v1/auth/login` (server sets the refresh cookie) → `login()` stores
   the access token in-memory + user in state → redirect `/`.
6. Logout → `POST /v1/auth/logout` clears the cookie server-side, then the in-memory token
   is cleared locally.

```ts
// route guard in _authenticated.tsx
import { getAccessToken } from "@/lib/token-store";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: () => {
    if (!getAccessToken()) throw redirect({ to: "/login" });
  },
  component: () => <AppLayout />,
});
```

## Permission-based nav & gating

The sidebar in `app-layout.tsx` filters navigation items by permission. The current
user is an `AuthUser` whose `role` embeds a `permissions: string[]` (e.g.
`"patients:write"`). Use the `hasPermission` helper from `@/lib/permissions`:

```ts
import { hasPermission } from "@/lib/permissions";

const { user } = useAuth();
const canEdit = hasPermission(user, "patients:write");
```

Nav items declare a required permission; items render when the user has it:

```ts
const navItems = [
  { to: "/patients", label: "Pasien", icon: Users, permission: "patients:read" },
  { to: "/roles", label: "Peran", icon: ShieldCheck, permission: "roles:read" },
];
const filtered = navItems.filter((i) => !i.permission || hasPermission(user, i.permission));
```

Every action (create/edit/delete) is gated the same way. The seeded classic roles
(`paramedic`, `doctor`, `logistic_admin`, `admin`) are dynamic roles too — admins can
create custom roles via `/roles`.

## Test-driven development

### Test infrastructure

| File | Purpose |
|---|---|
| `src/test/setup.ts` | Registers `@testing-library/jest-dom/vitest` matchers |
| `src/test/test-utils.tsx` | `renderWithProviders()` — wraps component in QueryClientProvider + AuthProvider + RouterProvider |

### Writing tests

Tests live alongside features in `features/<name>/__tests__/`. Pure logic tests
live in `lib/__tests__/`. Pattern:

```ts
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("SomeComponent", () => {
  it("does something", async () => {
    // Mock hooks that make API calls
    vi.mock("../hooks/use-something", () => ({
      useSomething: () => ({ ... }),
    }));

    render(<SomeComponent />);

    expect(screen.getByText("...")).toBeInTheDocument();
  });
});
```

Run: `pnpm --filter @simk/web test` (or `pnpm test` for the whole repo)

### TDD workflow for new features

1. **PRD** — Confirm the use case in `packages/contracts/docs/PRD.md`. Know the actor role.
2. **Route** — Add a file in `src/routes/_authenticated/<feature>.tsx` for the new page.
   Route is auto-generated on next Vite run.
3. **Sidebar** — Add the nav item to the `navItems` array in `app-layout.tsx` with the correct role.
4. **API layer** — Create `features/<name>/api/<operation>.ts` with raw fetch functions
   using `import { api } from "@/lib/api"`.
5. **Query hooks** — Create `features/<name>/hooks/use-<operation>.ts` wrapping
   the API call in `useQuery` or `useMutation`.
6. **Test** — Write the test file in `features/<name>/__tests__/`. Mock the query hook,
   render the component, assert behaviors. Tests should fail (red).
7. **Component** — Implement the UI component in `features/<name>/components/`.
   Re-run tests (green).
8. **Page** — Wire the component into the route file. Add `navItems` entry.
9. **Verification** — Run `pnpm typecheck`, then `pnpm test`. Both must pass.

## Styling conventions

- **Tailwind** utility classes for all styling
- **shadcn/ui** components for consistent design system (Button, Card, Input, etc.)
- **CSS variables** defined in `index.css` (`:root` / `.dark`) for theming
- Use the `cn()` helper from `@/lib/utils` for conditional class merging
- Mobile-first: sidebar collapses via hamburger menu, uses CSS transform

```tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

<Button variant="outline" className={cn("w-full", isActive && "ring-2")}>
  Click
</Button>
```

## Commands

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server (Vite, port 5173) |
| `pnpm build` | Type-check + production build (`tsc --noEmit && vite build`) |
| `pnpm preview` | Preview production build |
| `pnpm test` | Run vitest suite |
| `pnpm test:watch` | Run vitest in watch mode |
| `pnpm typecheck` | TypeScript check (`tsc --noEmit`) |

## Environment

| Variable | Default | Description |
|---|---|---|
| `VITE_API_URL` | `http://localhost:3000` | Backend API base URL |

The backend must be running at `VITE_API_URL` for API calls to work during development.
Start it with `pnpm dev` from the repo root (runs both api + web via Turborepo).