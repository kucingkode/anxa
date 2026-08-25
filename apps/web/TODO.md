# TODO.md — Frontend End-to-End Implementation

Implementation plan for `apps/web` following the **feature-based architecture**
and **test-driven development** workflow documented in `apps/web/AGENTS.md`.

> **Status legend:** `[ ]` not started · `[~]` in progress · `[x]` done

---

## 0. Foundation (DONE)

- [x] Dependencies: TanStack Router + Query, Tailwind, shadcn/ui, Lucide
- [x] Feature-based folder structure (`src/features/<name>/…`)
- [x] `lib/` — typed API client, `AuthProvider`, `query-client`, `cn()`
- [x] `components/ui/` — Button, Card, Input, Label
- [x] `components/layout/app-layout.tsx` — sidebar + header, role-based nav
- [x] File-based routing + `_authenticated` auth guard
- [x] Login feature (`auth`) end-to-end with tests
- [x] Test utils (`renderWithProviders`) + test setup

---

## 1. Shared infrastructure hardening

- [x] `Table` component (`components/ui/table.tsx`)
- [x] `Dialog` + `AlertDialog` components for create/edit forms and delete confirmations
- [x] `Select` and `Textarea` components for form inputs
- [x] `Badge` component for status display
- [x] `Skeleton` loading component
- [x] `Toaster` (sonner) for success/error notifications
- [x] `lib/labels.ts` — Indonesian label maps for all enums
- [x] `lib/errors.ts` — `getErrorMessage` helper
- [x] Debounced `SearchInput` component (`components/ui/search-input.tsx` + `useDebouncedValue`)
- [x] Pagination — `Pagination` + `usePagination`, backend `offset` param added to all list endpoints
- [x] Optimistic-lock conflict handling — `ApiError` + `notifyMutationError` "Muat ulang" action on `412`

---

## 2. Paramedic features (role: `paramedic`)

### 2.1 Patients

- [x] API layer, query hooks, components (`patient-list`, `patient-form`, `patient-detail`)
- [x] Routes: `/patients` + `/patients/$patientId`
- [x] Tests: list, search, create/update/delete flows, role-gated actions

### 2.2 Queues

- [x] API layer, hooks, components (`queue-list`, `queue-form`)
- [x] Route: `/queues`
- [x] Tests: list, enqueue, status transition (If-Match), delete

---

## 3. Doctor features (role: `doctor`)

### 3.1 Patients (read-only search)

- [x] Reuses `features/patients`; actions gated to paramedic only

### 3.2 Visits & Follow-up visits

- [x] API layers, hooks, components (`patient-visits`, `follow-up-visit-form`)
- [x] Route: `/patients/$patientId/visits`
- [x] Tests: visit listing, follow-up CRUD, status transitions

### 3.3 Observations

- [x] API layer, hooks, components (`observation-list`, `observation-form`)
- [x] Status transition via state machine (If-Match)
- [x] Tests: CRUD, status transition, optimistic locking

### 3.4 Conditions

- [x] API layer, hooks, components (`condition-list`, `condition-form`)
- [x] Tests: CRUD, soft delete

### 3.5 Procedures

- [x] API layer, hooks, components (`procedure-list`, `procedure-form`)
- [x] Tests: CRUD, soft delete

### Visit detail (composed)

- [x] `visit-detail.tsx` composes Observation/Condition/Procedure lists
- [x] Route: `/patients/$patientId/visits/$visitId`

---

## 4. Logistic Admin features (role: `logistic_admin`)

### 4.1 Products

- [x] API layer, hooks, components (`product-list`, `product-form`)
- [x] Route: `/products` (manufacturer join)
- [x] Tests: list, search, CRUD

### 4.2 Manufacturers

- [x] API layer, hooks, components (`manufacturer-list`, `manufacturer-form`)
- [x] Route: `/manufacturers`
- [x] Tests: list, search, CRUD

---

## 5. Admin features (role: `admin`)

### 5.1 Users

- [x] API layer, hooks, components (`user-list`, `user-form`)
- [x] Route: `/users`
- [x] Tests: list, search by role, CRUD

### 5.2 Condition references

- [x] API layer, hooks, components
- [x] Route: `/references/conditions`
- [x] Tests: list, search, CRUD

### 5.3 Procedure references

- [x] API layer, hooks, components
- [x] Route: `/references/procedures`
- [x] Tests: list, search, CRUD

---

## 6. Cross-cutting concerns

- [x] Loading / error / empty states on every list page
- [x] Role-gated rendering — actions hidden based on `user.role` (per PRD matrix)
- [x] Toast notifications for success/error
- [x] Global 401 redirect on expired token (`lib/api.ts` `onResponse` middleware)
- [x] Optimistic-lock "refresh" action on `412` (toast "Muat ulang" → invalidates query)

---

## 7. End-to-end testing (Playwright)

- [x] Playwright config + fixtures (`playwright.config.ts`, `e2e/helpers.ts`)
- [x] E2E: login flow (redirect, invalid, valid credentials)
- [x] E2E: patient create + list (paramedic)
- [x] E2E: role-based access (doctor sees read-only patient list)
- [x] E2E: queue management (paramedic)
- [x] E2E: product + manufacturer CRUD (logistic admin)
- [x] E2E: condition reference CRUD (admin)
- [x] E2E: observation CRUD (doctor)
- [x] Wire `pnpm --filter @simk/web test:e2e`

---

## 8. Release checklist

- [x] `pnpm typecheck` passes (all packages)
- [x] `pnpm test` passes (125 web + 135 api unit tests)
- [x] `pnpm --filter @simk/web test:e2e` passes (5 E2E tests)
- [x] `pnpm build` passes (vite production build)
- [x] All nav items resolve to real routes
