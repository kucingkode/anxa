# SIMK — Product Requirements Document (MVP)

> **Status:** Draft
> **Product:** SIMK (Sistem Informasi & Manajemen Klinik) — clinic information & management system
> **Scope:** Minimum Viable Product (MVP)
> **Related docs:** [SatuSehat integration notes](./satusehat/README.md)

---

## 1. Overview

SIMK is a clinic information & management system integrated with Indonesia
[SatuSehat](https://satusehat.kemkes.go.id) (HL7 FHIR R4). The MVP covers the
core clinical and administrative workflows of a clinic: patient registration,
visit/queue management, clinical observations, and reference-data
administration.

## 2. Goals & Non-Goals

### Goals

- Support the day-to-day clinical workflow (patient → visit/queue → observation).
- Enforce role-based access control so each role only sees its allowed actions.
- Keep the domain model aligned with FHIR R4 so SatuSehat integration is a thin
  translation layer, not a rewrite.

### Non-Goals (out of scope for MVP)

- Billing / claims (BPJS & private insurance).
- Pharmacy dispensing workflow (MedicationDispense).
- KYC / patient identity verification against SatuSehat.
- Reporting & analytics dashboards.
- Non-functional work beyond basic authentication.

## 3. Roles & Permissions (dynamic RBAC)

Access control is **dynamic**: rather than a fixed set of roles, the system uses
**roles** that bundle granular **permissions**. Administrators can create custom
roles and grant each role read / write / delete access to individual resources.

### Permissions

A permission is the string `"{resource}:{action}"`, where `action` is one of
`read`, `write`, or `delete`:

| Action   | Meaning                        |
| -------- | ------------------------------ |
| `read`   | List and read the resource     |
| `write`  | Create and update the resource |
| `delete` | Delete the resource            |

Permission subjects (resources):

`patients`, `queues`, `visits`, `follow-up-visits`, `observations`, `conditions`,
`procedures`, `products`, `manufacturers`, `users`, `condition-references`,
`procedure-references`, `roles`.

Examples: `patients:write`, `observations:read`, `users:delete`.

### Role

A role has a unique `name`, an optional `description`, and a set of `permissions`.
System roles (`isSystem: true`) are seeded and cannot be deleted.

### Classic roles (seeded)

| Role             | Description                                            |
| ---------------- | ------------------------------------------------------ |
| `paramedic`      | Front-desk / nursing staff managing patients & queues  |
| `doctor`         | Clinical staff managing observations, conditions, etc. |
| `logistic_admin` | Manages product & manufacturer catalogs                |
| `admin`          | Superuser — everything, incl. users, references & roles |

### Classic role permission sets

`*` below means `read`, `write`, and `delete`.

| Permission                | paramedic | doctor | logistic_admin | admin |
| ------------------------- | :-------: | :----: | :------------: | :---: |
| `patients:*`              |    ✅     |  read  |       —        |  ✅   |
| `queues:*`                |    ✅     |   —    |       —        |  ✅   |
| `visits:*`                |   read    |  read  |       —        |  ✅   |
| `follow-up-visits:*`      |     —     |   ✅   |       —        |  ✅   |
| `observations:*`          |     —     |   ✅   |       —        |  ✅   |
| `conditions:*`            |     —     |   ✅   |       —        |  ✅   |
| `procedures:*`            |     —     |   ✅   |       —        |  ✅   |
| `products:*`              |     —     |   —    |       ✅       |  ✅   |
| `manufacturers:*`         |     —     |   —    |       ✅       |  ✅   |
| `users:*`                 |     —     |   —    |       —        |  ✅   |
| `condition-references:*`  |     —     |   —    |       —        |  ✅   |
| `procedure-references:*`  |     —     |   —    |       —        |  ✅   |
| `roles:*`                 |     —     |   —    |       —        |  ✅   |

Login / logout is available to every authenticated user regardless of role.

## 4. Domain Entities

Entities map to FHIR R4 resources where applicable to align with SatuSehat.
Two kinds exist: **catalog/reference** (managed by Admin/Logistic, shared
lookup data) and **clinical records** (anchored to a patient + visit, managed
by Doctor).

| Entity            | Kind     | FHIR R4 mapping         | Notes                                                                          |
| ----------------- | -------- | ----------------------- | ------------------------------------------------------------------------------ |
| Patient           | clinical | `Patient`               | NIK / IHS identifier, name, gender, birth date, phone                          |
| Visit (Encounter) | clinical | `Encounter`             | A patient's clinical visit; anchors queue, observations, and clinical records  |
| Queue             | clinical | `Appointment` / `Slot`  | A patient's position in the visit queue (MVP: internal); becomes/links a Visit |
| Follow-up Visit   | clinical | `Appointment`           | Scheduled return visit for a patient                                           |
| Observation       | clinical | `Observation`           | Clinical measurement (vital signs, lab result) anchored to a Visit             |
| Condition         | clinical | `Condition`             | Diagnosis record attached to a patient visit                                   |
| Procedure         | clinical | `Procedure`             | Performed procedure record attached to a patient visit                         |
| Condition (ref)   | catalog  | `Condition` code        | Admin-managed diagnosis reference list                                         |
| Procedure (ref)   | catalog  | `Procedure` code        | Admin-managed procedure reference list                                         |
| Product           | catalog  | `Medication` / `Device` | Catalog item managed by logistic admin                                         |
| Manufacturer      | catalog  | `Organization`          | Maker of a product                                                             |
| User              | internal | —                       | System account assigned to a role                                              |
| Role              | internal | —                       | A named bundle of permissions; users are assigned one role                     |

### Field requirements (minimal)

| Entity            | Required fields                                 |
| ----------------- | ----------------------------------------------- |
| Patient           | `name`, `identifier` (NIK, immutable), `gender` |
| Visit (Encounter) | `patient`, `status`, `class`                    |
| Queue             | `patient`, `status`                             |
| Follow-up Visit   | `patient`, `date`, `status`                     |
| Observation       | `patient`, `visit`, `code`, `value`, `status`   |
| Condition         | `patient`, `visit`, `code`                      |
| Procedure         | `patient`, `visit`, `code`                      |
| Condition (ref)   | `code`, `display`                               |
| Procedure (ref)   | `code`, `display`                               |
| Product           | `name`, `code`, `unit`, `manufacturer`          |
| Manufacturer      | `name`, `identifier`                            |
| User              | `email`, `password` (hashed), `roleId`         |
| Role              | `name`, `permissions`                          |

### State machines

**Queue** — `waiting → in-service → done`; `waiting`/`in-service → cancelled`
(patient left). Terminal states: `done`, `cancelled`.

**Observation** — `preliminary → final → amended`; any non-terminal state →
`cancelled` or `entered-in-error`. Only these transitions are allowed.

**Follow-up Visit** — `booked → arrived → fulfilled`; `booked → cancelled` or
`noshow`.

## 5. Use Cases

### 5.1 Everyone

#### UC-A1 — Login

- **Actor:** Any registered user (all roles).
- **Precondition:** User has an active account.
- **Flow:**
  1. User submits email/username + password.
  2. System validates credentials.
  3. On success, system issues an authenticated session (JWT).
- **Postcondition:** User is authenticated and authorized per role.
- **Acceptance criteria:**
  - Invalid credentials are rejected with a generic error.
  - Successful login returns the user's role to drive UI permissions.

#### UC-A2 — Logout

- **Actor:** Any authenticated user.
- **Flow:** User ends the session; server invalidates the token/session.
- **Acceptance criteria:** Subsequent requests with the revoked session are rejected (401).

### 5.2 Doctor

#### UC-D1 — Search patient

- **Actor:** Doctor.
- **Flow:** Doctor searches by name, NIK/IHS identifier, or internal id; system returns matching patients.
- **Acceptance criteria:** Partial-name search and exact identifier lookup both return correct results.

#### UC-D2 — Search follow-up visit

- **Actor:** Doctor.
- **Flow:** Doctor lists scheduled follow-up visits for a patient (by date/status).
- **Acceptance criteria:** Only visits in `booked`/`arrived` status are returned by default.

#### UC-D3 — Add patient observation data

- **Actor:** Doctor.
- **Flow:** Doctor creates an `Observation` linked to a patient and a visit (Encounter).
- **Acceptance criteria:** Observation is stored with patient + visit reference, code, value, and status `preliminary` (or `final`).

#### UC-D4 — Update patient observation data

- **Actor:** Doctor.
- **Flow:** Doctor edits the value/interpretation of an existing observation.
- **Acceptance criteria:**
  - Changes persist; historical version is retained (audit).
  - Concurrent update without a matching version is rejected (optimistic locking).

#### UC-D5 — Update observation status

- **Actor:** Doctor.
- **Flow:** Doctor changes an observation's status per the state machine in §4.
- **Acceptance criteria:** Only valid transitions are allowed; invalid ones are rejected with `409`.

#### UC-D6 — Delete patient observation data

- **Actor:** Doctor.
- **Flow:** Doctor removes an erroneous observation.
- **Acceptance criteria:** Deletion is soft (status `entered-in-error`, record kept) to preserve audit trail.

#### UC-D7/8/9 — Add / Update / Delete patient condition

- **Actor:** Doctor.
- **Flow:** Attach a diagnosis (`Condition`) to a patient visit, edit, or mark it erroneous.
- **Acceptance criteria:** Reference is chosen from the Admin-managed reference list; deletion is soft.

#### UC-D10/11/12 — Add / Update / Delete patient procedure

- **Actor:** Doctor.
- **Flow:** Attach a performed procedure (`Procedure`) to a patient visit, edit, or mark it erroneous.
- **Acceptance criteria:** Reference is chosen from the Admin-managed reference list; deletion is soft.

### 5.3 Paramedic

#### UC-P1 — Add patient

- **Actor:** Paramedic.
- **Flow:** Register a new patient with name, identifier (NIK), gender, birth date, phone.
- **Acceptance criteria:** Duplicate NIK is rejected; patient gets an internal id + created timestamp.

#### UC-P2 — Update patient

- **Actor:** Paramedic.
- **Flow:** Edit patient demographics (name, phone, etc.).
- **Acceptance criteria:** Identifier (NIK) is immutable after creation.

#### UC-P3 — Delete patient

- **Actor:** Paramedic.
- **Flow:** Remove a patient record.
- **Acceptance criteria:**
  - Deletion is soft.
  - Blocked if the patient has an active queue entry or visit; otherwise allowed.

#### UC-P4 — Search patient

- **Actor:** Paramedic.
- **Flow:** Same as UC-D1.

#### UC-P5 — Add queue

- **Actor:** Paramedic.
- **Flow:** Add a patient to a service queue (status `waiting`).
- **Acceptance criteria:** A patient cannot be queued twice in the same active visit.

#### UC-P6 — Update queue

- **Actor:** Paramedic.
- **Flow:** Change queue entry status per the state machine in §4.
- **Acceptance criteria:** Concurrent update without a matching version is rejected (optimistic locking).

#### UC-P7 — Delete queue

- **Actor:** Paramedic.
- **Flow:** Remove a queue entry (e.g. patient left without being seen).
- **Acceptance criteria:** Removal is soft; the underlying visit (if any) is closed, not deleted.

### 5.4 Logistic Admin

#### UC-L1 — List / search product

- **Actor:** Logistic Admin.
- **Flow:** Search products by name, code, or manufacturer.

#### UC-L2/3/4 — Add / Update / Delete product

- **Actor:** Logistic Admin.
- **Flow:** Manage the product catalog (name, code, unit, manufacturer reference).
- **Acceptance criteria:** Product cannot be deleted while referenced by an active catalog/manufacturer mapping (soft delete otherwise).

#### UC-L5 — List / search manufacturer

- **Actor:** Logistic Admin.
- **Flow:** Search manufacturers by name or identifier.

#### UC-L6/7/8 — Add / Update / Delete manufacturer

- **Actor:** Logistic Admin.
- **Flow:** Manage manufacturers (name, identifier, contact).
- **Acceptance criteria:** Manufacturer cannot be deleted while referenced by a product (soft delete otherwise).

### 5.5 Admin

#### UC-M1 — List / search user

- **Actor:** Admin.
- **Flow:** List/search system accounts by name, email, or role.

#### UC-M2/3/4 — Add / Update / Delete user

- **Actor:** Admin.
- **Flow:** Manage system accounts and assign roles.
- **Acceptance criteria:** Admin cannot delete themselves; role assignment is validated against known roles.

#### UC-M5 — List / search condition (reference list)

- **Actor:** Admin.
- **Flow:** Search the diagnosis reference list by code or display name.

#### UC-M6/7/8 — Add / Update / Delete condition (reference list)

- **Actor:** Admin.
- **Flow:** Manage the diagnosis reference list.
- **Acceptance criteria:** A code in use by a clinical Condition record cannot be hard-deleted.

#### UC-M9 — List / search procedure (reference list)

- **Actor:** Admin.
- **Flow:** Search the procedure reference list by code or display name.

#### UC-M10/11/12 — Add / Update / Delete procedure (reference list)

- **Actor:** Admin.
- **Flow:** Manage the procedure reference list.
- **Acceptance criteria:** A code in use by a clinical Procedure record cannot be hard-deleted.

#### UC-M13 — List / search role

- **Actor:** Admin.
- **Flow:** List the roles (system + custom) and their permissions.

#### UC-M14 — Add / Update role

- **Actor:** Admin.
- **Flow:** Create a custom role with a name and a set of `resource:action` permissions; edit an existing role's name/description/permissions.
- **Acceptance criteria:**
  - Role `name` must be unique.
  - Permissions are validated against the known `resource:action` set.
  - System roles (`isSystem`) cannot be renamed or have their permissions reduced (only custom roles are editable).

#### UC-M15 — Delete role

- **Actor:** Admin.
- **Flow:** Delete a custom role.
- **Acceptance criteria:**
  - System roles cannot be deleted.
  - A role still assigned to one or more users cannot be deleted.

## 6. Non-Functional Requirements

| Area        | Requirement                                                                               |
| ----------- | ----------------------------------------------------------------------------------------- |
| AuthN       | Token-based; short-lived access token + refresh, or equivalent session                    |
| AuthZ       | Every endpoint enforces `resource:action` permissions from §3 (dynamic RBAC)          |
| Audit       | Soft delete + created/updated timestamps on clinical records                              |
| Concurrency | Optimistic locking (version / `If-Match`) on queue & observation updates                  |
| Integration | FHIR R4 mapping layer for `Patient`, `Encounter`, `Observation`, `Condition`, `Procedure` |

## 7. Acceptance / Definition of Done

- All use cases in §5 are implemented and covered by automated tests.
- Authorization is enforced per the permissions in §3.
- State machines in §4 are enforced server-side (invalid transitions → `409`).
- Contracts (OpenAPI) are updated for every new endpoint (`contract-first`).
