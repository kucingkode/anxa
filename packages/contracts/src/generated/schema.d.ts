export type paths = {
    "/v1/health": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Liveness probe */
        get: operations["getHealth"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Authenticate a user (email + password) */
        post: operations["login"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/logout": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** End the current session */
        post: operations["logout"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/refresh": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Refresh the access token using the refresh cookie */
        post: operations["refresh"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/patients": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Search patients by name or identifier */
        get: operations["listPatients"];
        put?: never;
        /** Register a new patient */
        post: operations["createPatient"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/patients/{patientId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a patient by id */
        get: operations["getPatient"];
        put?: never;
        post?: never;
        /** Soft-delete a patient (blocked while a queue/visit is active) */
        delete: operations["deletePatient"];
        options?: never;
        head?: never;
        /** Update patient demographics (identifier is immutable) */
        patch: operations["updatePatient"];
        trace?: never;
    };
    "/v1/patients/{patientId}/visits": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List a patient's visits */
        get: operations["listPatientVisits"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/queues": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List / search queue entries */
        get: operations["listQueues"];
        put?: never;
        /** Add a patient to the service queue (status `waiting`) */
        post: operations["createQueue"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/queues/{queueId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a queue entry by id */
        get: operations["getQueue"];
        put?: never;
        post?: never;
        /** Soft-delete a queue entry (closes the underlying visit, if any) */
        delete: operations["deleteQueue"];
        options?: never;
        head?: never;
        /** Change queue status (optimistic locking via `If-Match`) */
        patch: operations["updateQueue"];
        trace?: never;
    };
    "/v1/visits": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List / search clinical visits */
        get: operations["listVisits"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/visits/{visitId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a visit by id */
        get: operations["getVisit"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/follow-up-visits": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List / search follow-up visits */
        get: operations["listFollowUpVisits"];
        put?: never;
        /** Schedule a follow-up visit */
        post: operations["createFollowUpVisit"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/follow-up-visits/{followUpVisitId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a follow-up visit by id */
        get: operations["getFollowUpVisit"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Update a follow-up visit (date / status transition) */
        patch: operations["updateFollowUpVisit"];
        trace?: never;
    };
    "/v1/observations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List / search clinical observations */
        get: operations["listObservations"];
        put?: never;
        /** Add patient observation data */
        post: operations["createObservation"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/observations/{observationId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get an observation by id */
        get: operations["getObservation"];
        put?: never;
        post?: never;
        /** Soft-delete an observation (status `entered-in-error`) */
        delete: operations["deleteObservation"];
        options?: never;
        head?: never;
        /** Update observation value / interpretation (optimistic locking) */
        patch: operations["updateObservation"];
        trace?: never;
    };
    "/v1/observations/{observationId}/status": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Update observation status (state-machine transition) */
        patch: operations["updateObservationStatus"];
        trace?: never;
    };
    "/v1/conditions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List / search patient conditions */
        get: operations["listConditions"];
        put?: never;
        /** Add a patient condition (diagnosis) */
        post: operations["createCondition"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/conditions/{conditionId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a condition by id */
        get: operations["getCondition"];
        put?: never;
        post?: never;
        /** Soft-delete a patient condition */
        delete: operations["deleteCondition"];
        options?: never;
        head?: never;
        /** Update a patient condition */
        patch: operations["updateCondition"];
        trace?: never;
    };
    "/v1/procedures": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List / search patient procedures */
        get: operations["listProcedures"];
        put?: never;
        /** Add a performed patient procedure */
        post: operations["createProcedure"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/procedures/{procedureId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a procedure by id */
        get: operations["getProcedure"];
        put?: never;
        post?: never;
        /** Soft-delete a patient procedure */
        delete: operations["deleteProcedure"];
        options?: never;
        head?: never;
        /** Update a patient procedure */
        patch: operations["updateProcedure"];
        trace?: never;
    };
    "/v1/products": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List / search products */
        get: operations["listProducts"];
        put?: never;
        /** Add a product to the catalog */
        post: operations["createProduct"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/products/{productId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a product by id */
        get: operations["getProduct"];
        put?: never;
        post?: never;
        /** Soft-delete a product */
        delete: operations["deleteProduct"];
        options?: never;
        head?: never;
        /** Update a product */
        patch: operations["updateProduct"];
        trace?: never;
    };
    "/v1/manufacturers": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List / search manufacturers */
        get: operations["listManufacturers"];
        put?: never;
        /** Add a manufacturer */
        post: operations["createManufacturer"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/manufacturers/{manufacturerId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a manufacturer by id */
        get: operations["getManufacturer"];
        put?: never;
        post?: never;
        /** Soft-delete a manufacturer */
        delete: operations["deleteManufacturer"];
        options?: never;
        head?: never;
        /** Update a manufacturer */
        patch: operations["updateManufacturer"];
        trace?: never;
    };
    "/v1/users": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List / search system users */
        get: operations["listUsers"];
        put?: never;
        /** Add a system user */
        post: operations["createUser"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/users/{userId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a user by id */
        get: operations["getUser"];
        put?: never;
        post?: never;
        /** Delete a system user (cannot delete yourself) */
        delete: operations["deleteUser"];
        options?: never;
        head?: never;
        /** Update a system user */
        patch: operations["updateUser"];
        trace?: never;
    };
    "/v1/roles": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List / search roles */
        get: operations["listRoles"];
        put?: never;
        /** Add a custom role */
        post: operations["createRole"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/roles/{roleId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a role by id */
        get: operations["getRole"];
        put?: never;
        post?: never;
        /** Delete a custom role */
        delete: operations["deleteRole"];
        options?: never;
        head?: never;
        /** Update a role */
        patch: operations["updateRole"];
        trace?: never;
    };
    "/v1/condition-references": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List / search the condition reference list */
        get: operations["listConditionReferences"];
        put?: never;
        /** Add a condition reference */
        post: operations["createConditionReference"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/condition-references/{conditionReferenceId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a condition reference by id */
        get: operations["getConditionReference"];
        put?: never;
        post?: never;
        /** Delete a condition reference (blocked while referenced by a Condition) */
        delete: operations["deleteConditionReference"];
        options?: never;
        head?: never;
        /** Update a condition reference */
        patch: operations["updateConditionReference"];
        trace?: never;
    };
    "/v1/procedure-references": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List / search the procedure reference list */
        get: operations["listProcedureReferences"];
        put?: never;
        /** Add a procedure reference */
        post: operations["createProcedureReference"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/procedure-references/{procedureReferenceId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a procedure reference by id */
        get: operations["getProcedureReference"];
        put?: never;
        post?: never;
        /** Delete a procedure reference (blocked while referenced by a Procedure) */
        delete: operations["deleteProcedureReference"];
        options?: never;
        head?: never;
        /** Update a procedure reference */
        patch: operations["updateProcedureReference"];
        trace?: never;
    };
};
export type webhooks = Record<string, never>;
export type components = {
    schemas: {
        Health: {
            /** @enum {string} */
            status: "ok";
            /** @description Process uptime in seconds. */
            uptime: number;
        };
        Error: {
            /** @example 400 */
            statusCode: number;
            /** @example Bad Request */
            error: string;
            /** @example Invalid request body */
            message: string;
        };
        /**
         * @description Patient registry entry. Mirrors the minimal set of FHIR R4 `Patient`
         *     fields required by SatuSehat.
         */
        Patient: {
            /** @description Internal resource id. */
            id: string;
            /** @description Full name (FHIR HumanName.text). */
            name: string;
            /** @description NIK (Nomor Induk Kependudukan) or SatuSehat IHS number. */
            identifier: string;
            /** @enum {string} */
            gender: "male" | "female" | "other" | "unknown";
            /** Format: date */
            birthDate?: string;
            phone?: string;
            /** Format: date-time */
            createdAt: string;
        };
        NewPatient: {
            name: string;
            identifier: string;
            /** @enum {string} */
            gender: "male" | "female" | "other" | "unknown";
            /** Format: date */
            birthDate?: string;
            phone?: string;
        };
        /**
         * @description Editable patient demographics. The `identifier` (NIK) is immutable after
         *     creation and must not be sent here.
         */
        UpdatePatient: {
            name?: string;
            /** @enum {string} */
            gender?: "male" | "female" | "other" | "unknown";
            /** Format: date */
            birthDate?: string;
            phone?: string;
        };
        LoginRequest: {
            /**
             * Format: email
             * @example user@clinic.id
             */
            email: string;
            /** @example StrongPassword123 */
            password: string;
        };
        LoginResponse: {
            /**
             * @description Short-lived JWT access token.
             * @example eyJhbGciOiJIUzI1NiJ9...
             */
            accessToken: string;
            user: components["schemas"]["AuthUser"];
        };
        RefreshResponse: {
            /**
             * @description New short-lived JWT access token.
             * @example eyJhbGciOiJIUzI1NiJ9...
             */
            accessToken: string;
            user: components["schemas"]["AuthUser"];
        };
        AuthUser: {
            /** Format: uuid */
            id: string;
            name?: string;
            /** Format: email */
            email: string;
            role: components["schemas"]["Role"];
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        Role: {
            /** Format: uuid */
            id: string;
            name: string;
            description?: string;
            /** @description Permission strings in the form "resource:action" (e.g. "patients:write"). */
            permissions: string[];
            /** @description System roles are seeded and cannot be deleted or have their permissions reduced. */
            isSystem: boolean;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        NewRole: {
            name: string;
            description?: string;
            /** @description Permission strings in the form "resource:action" (e.g. "patients:write"). */
            permissions: string[];
        };
        UpdateRole: {
            name?: string;
            description?: string;
            /** @description Permission strings in the form "resource:action" (e.g. "patients:write"). */
            permissions?: string[];
        };
        User: {
            /** Format: uuid */
            id: string;
            name?: string;
            /** Format: email */
            email: string;
            /**
             * Format: uuid
             * @description Reference to the user's Role.
             */
            roleId: string;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        NewUser: {
            name?: string;
            /** Format: email */
            email: string;
            password: string;
            /**
             * Format: uuid
             * @description Reference to the Role to assign to the user.
             */
            roleId: string;
        };
        UpdateUser: {
            name?: string;
            /** Format: email */
            email?: string;
            password?: string;
            /**
             * Format: uuid
             * @description Reference to the Role to assign to the user.
             */
            roleId?: string;
        };
        Queue: {
            /** Format: uuid */
            id: string;
            /**
             * Format: uuid
             * @description Reference to the queued `Patient`.
             */
            patientId: string;
            /**
             * Format: uuid
             * @description Reference to the `Visit` once the queue reaches service (nullable).
             */
            visitId?: string;
            /**
             * @description `waiting → in-service → done`; `waiting`/`in-service → cancelled`.
             *     Terminal states: `done`, `cancelled`.
             * @enum {string}
             */
            status: "waiting" | "in-service" | "done" | "cancelled";
            /** @description Optimistic-locking version; bump on every update. */
            version: number;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        NewQueue: {
            /**
             * Format: uuid
             * @description Reference to the patient to enqueue.
             */
            patientId: string;
        };
        UpdateQueue: {
            /**
             * @description Next state per the queue state machine
             *     (`waiting → in-service → done`; `waiting`/`in-service → cancelled`).
             * @enum {string}
             */
            status: "waiting" | "in-service" | "done" | "cancelled";
        };
        /**
         * @description A patient's clinical visit. Anchors queues, observations, and clinical
         *     records. Mapped to FHIR R4 `Encounter`.
         */
        Visit: {
            /** Format: uuid */
            id: string;
            /** Format: uuid */
            patientId: string;
            /**
             * @description FHIR R4 `Encounter.status`.
             * @enum {string}
             */
            status: "planned" | "arrived" | "triaged" | "in-progress" | "finished" | "cancelled";
            /**
             * @description FHIR R4 `Encounter.class` code (e.g. AMB, EMER, IMP).
             * @example AMB
             */
            class: string;
            /** Format: date-time */
            periodStart?: string;
            /** Format: date-time */
            periodEnd?: string;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        /** @description Scheduled return visit for a patient. Mapped to FHIR R4 `Appointment`. */
        FollowUpVisit: {
            /** Format: uuid */
            id: string;
            /** Format: uuid */
            patientId: string;
            /**
             * Format: date-time
             * @description Scheduled date and time of the return visit.
             */
            date: string;
            /**
             * @description `booked → arrived → fulfilled`; `booked → cancelled` or `noshow`.
             * @enum {string}
             */
            status: "booked" | "arrived" | "fulfilled" | "cancelled" | "noshow";
            reason?: string;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        NewFollowUpVisit: {
            /** Format: uuid */
            patientId: string;
            /** Format: date-time */
            date: string;
            reason?: string;
        };
        UpdateFollowUpVisit: {
            /** Format: date-time */
            date?: string;
            /**
             * @description `booked → arrived → fulfilled`; `booked → cancelled` or `noshow`.
             * @enum {string}
             */
            status?: "booked" | "arrived" | "fulfilled" | "cancelled" | "noshow";
            reason?: string;
        };
        /**
         * @description Clinical measurement (vital sign, lab result) anchored to a Visit.
         *     Mapped to FHIR R4 `Observation`.
         */
        Observation: {
            /** Format: uuid */
            id: string;
            /** Format: uuid */
            patientId: string;
            /** Format: uuid */
            visitId: string;
            /** @description LOINC / SNOMED observation code. */
            code: string;
            /** @description Human-readable display of the code. */
            codeDisplay?: string;
            /** @description Measured quantity value. */
            value: number;
            /** @description Unit of measure (e.g. mmHg, mg/dL). */
            unit?: string;
            /**
             * @description `preliminary → final → amended`; any non-terminal state → `cancelled`
             *     or `entered-in-error`.
             * @enum {string}
             */
            status: "preliminary" | "final" | "amended" | "cancelled" | "entered-in-error";
            /** @description Optional interpretation (e.g. normal, abnormal). */
            interpretation?: string;
            /** @description Optimistic-locking version; bump on every update. */
            version: number;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        NewObservation: {
            /** Format: uuid */
            patientId: string;
            /** Format: uuid */
            visitId: string;
            /** @description LOINC / SNOMED observation code. */
            code: string;
            codeDisplay?: string;
            value: number;
            unit?: string;
            /**
             * @default preliminary
             * @enum {string}
             */
            status: "preliminary" | "final" | "amended" | "cancelled" | "entered-in-error";
            interpretation?: string;
        };
        /**
         * @description Editable observation fields. `status` is changed through the dedicated
         *     status-transition endpoint instead.
         */
        UpdateObservation: {
            value?: number;
            unit?: string;
            codeDisplay?: string;
            interpretation?: string;
        };
        ObservationStatusUpdate: {
            /**
             * @description Next state per the observation state machine
             *     (`preliminary → final → amended`; non-terminal → `cancelled` or
             *     `entered-in-error`).
             * @enum {string}
             */
            status: "preliminary" | "final" | "amended" | "cancelled" | "entered-in-error";
        };
        /** @description Diagnosis record attached to a patient visit. Mapped to FHIR R4 `Condition`. */
        Condition: {
            /** Format: uuid */
            id: string;
            /** Format: uuid */
            patientId: string;
            /** Format: uuid */
            visitId: string;
            /** @description Diagnosis code chosen from the condition reference list. */
            code: string;
            codeDisplay?: string;
            /** @description FHIR R4 `Condition.clinicalStatus` (e.g. active, resolved). */
            clinicalStatus?: string;
            notes?: string;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        NewCondition: {
            /** Format: uuid */
            patientId: string;
            /** Format: uuid */
            visitId: string;
            /** @description Diagnosis code chosen from the condition reference list. */
            code: string;
            codeDisplay?: string;
            clinicalStatus?: string;
            notes?: string;
        };
        UpdateCondition: {
            codeDisplay?: string;
            clinicalStatus?: string;
            notes?: string;
        };
        /**
         * @description Performed-procedure record attached to a patient visit. Mapped to FHIR R4
         *     `Procedure`.
         */
        Procedure: {
            /** Format: uuid */
            id: string;
            /** Format: uuid */
            patientId: string;
            /** Format: uuid */
            visitId: string;
            /** @description Procedure code chosen from the procedure reference list. */
            code: string;
            codeDisplay?: string;
            /** @description FHIR R4 `Procedure.status` (e.g. preparation, completed). */
            status?: string;
            /** Format: date-time */
            performedAt?: string;
            notes?: string;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        NewProcedure: {
            /** Format: uuid */
            patientId: string;
            /** Format: uuid */
            visitId: string;
            /** @description Procedure code chosen from the procedure reference list. */
            code: string;
            codeDisplay?: string;
            status?: string;
            /** Format: date-time */
            performedAt?: string;
            notes?: string;
        };
        UpdateProcedure: {
            codeDisplay?: string;
            status?: string;
            /** Format: date-time */
            performedAt?: string;
            notes?: string;
        };
        /** @description Admin-managed diagnosis reference list entry. */
        ConditionReference: {
            /** Format: uuid */
            id: string;
            /** @description Diagnosis code (e.g. ICD-10 / SNOMED). */
            code: string;
            /** @description Human-readable diagnosis name. */
            display: string;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        NewConditionReference: {
            code: string;
            display: string;
        };
        UpdateConditionReference: {
            code?: string;
            display?: string;
        };
        /** @description Admin-managed procedure reference list entry. */
        ProcedureReference: {
            /** Format: uuid */
            id: string;
            /** @description Procedure code (e.g. ICD-9-CM / SNOMED). */
            code: string;
            /** @description Human-readable procedure name. */
            display: string;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        NewProcedureReference: {
            code: string;
            display: string;
        };
        UpdateProcedureReference: {
            code?: string;
            display?: string;
        };
        /**
         * @description Catalog item managed by the logistic admin. Mapped to FHIR R4
         *     `Medication` / `Device`.
         */
        Product: {
            /** Format: uuid */
            id: string;
            name: string;
            /** @description Product code (e.g. KFA code). */
            code: string;
            /** @description Unit of measure (e.g. tablet, strip, box). */
            unit: string;
            /**
             * Format: uuid
             * @description Reference to the `Manufacturer`.
             */
            manufacturerId: string;
            description?: string;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        NewProduct: {
            name: string;
            code: string;
            unit: string;
            /** Format: uuid */
            manufacturerId: string;
            description?: string;
        };
        UpdateProduct: {
            name?: string;
            code?: string;
            unit?: string;
            /** Format: uuid */
            manufacturerId?: string;
            description?: string;
        };
        /** @description Maker of a product. Mapped to FHIR R4 `Organization`. */
        Manufacturer: {
            /** Format: uuid */
            id: string;
            name: string;
            /** @description Business identifier of the manufacturer. */
            identifier: string;
            /** @description Contact details (phone / email / address). */
            contact?: string;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        NewManufacturer: {
            name: string;
            identifier: string;
            contact?: string;
        };
        UpdateManufacturer: {
            name?: string;
            identifier?: string;
            contact?: string;
        };
    };
    responses: {
        /** @description Invalid request body */
        BadRequest: {
            headers: {
                "x-request-id": components["headers"]["RequestID"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description Authentication required */
        Unauthorized: {
            headers: {
                "x-request-id": components["headers"]["RequestID"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description Insufficient permissions */
        Forbidden: {
            headers: {
                "x-request-id": components["headers"]["RequestID"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description Resource not found */
        NotFound: {
            headers: {
                "x-request-id": components["headers"]["RequestID"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description Conflict with the current resource state */
        Conflict: {
            headers: {
                "x-request-id": components["headers"]["RequestID"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description Internal server error */
        InternalServerError: {
            headers: {
                "x-request-id": components["headers"]["RequestID"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description Optimistic-lock version mismatch (`If-Match`) */
        PreconditionFailed: {
            headers: {
                "x-request-id": components["headers"]["RequestID"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
    };
    parameters: {
        /** @description Maximum number of records to return. */
        Limit: number;
        /**
         * @description Current resource `version` for optimistic locking. The update is rejected
         *     with `412` when it does not match the stored version.
         */
        IfMatch: string;
    };
    requestBodies: never;
    headers: {
        /** @description Request identity for logs and tracing */
        RequestID: string;
    };
    pathItems: never;
};
export type $defs = Record<string, never>;
export interface operations {
    getHealth: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Service is healthy */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Health"];
                };
            };
        };
    };
    login: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["LoginRequest"];
            };
        };
        responses: {
            /** @description Authenticated */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LoginResponse"];
                };
            };
            400: components["responses"]["BadRequest"];
            /** @description Invalid credentials */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            500: components["responses"]["InternalServerError"];
        };
    };
    logout: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Session ended */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["Unauthorized"];
            500: components["responses"]["InternalServerError"];
        };
    };
    refresh: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Refreshed */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RefreshResponse"];
                };
            };
            401: components["responses"]["Unauthorized"];
            500: components["responses"]["InternalServerError"];
        };
    };
    listPatients: {
        parameters: {
            query?: {
                /** @description Maximum number of records to return. */
                limit?: components["parameters"]["Limit"];
                /** @description Number of records to skip before returning results. */
                offset?: paths["/v1/users"]["get"]["parameters"]["query"]["offset"];
                /** @description Search by name or identifier (NIK / IHS). */
                query?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A list of patients */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Patient"][];
                };
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            500: components["responses"]["InternalServerError"];
        };
    };
    createPatient: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["NewPatient"];
            };
        };
        responses: {
            /** @description Patient created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Patient"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            /** @description Duplicate NIK / identifier */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            500: components["responses"]["InternalServerError"];
        };
    };
    getPatient: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                patientId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Patient found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Patient"];
                };
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    deletePatient: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                patientId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Patient deleted */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            /** @description Patient has an active queue entry or visit */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            500: components["responses"]["InternalServerError"];
        };
    };
    updatePatient: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                patientId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdatePatient"];
            };
        };
        responses: {
            /** @description Patient updated */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Patient"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    listPatientVisits: {
        parameters: {
            query?: {
                /** @description Maximum number of records to return. */
                limit?: components["parameters"]["Limit"];
                /** @description Number of records to skip before returning results. */
                offset?: paths["/v1/users"]["get"]["parameters"]["query"]["offset"];
            };
            header?: never;
            path: {
                patientId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A list of visits */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Visit"][];
                };
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    listQueues: {
        parameters: {
            query?: {
                /** @description Maximum number of records to return. */
                limit?: components["parameters"]["Limit"];
                /** @description Number of records to skip before returning results. */
                offset?: paths["/v1/users"]["get"]["parameters"]["query"]["offset"];
                patientId?: string;
                status?: "waiting" | "in-service" | "done" | "cancelled";
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A list of queue entries */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Queue"][];
                };
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            500: components["responses"]["InternalServerError"];
        };
    };
    createQueue: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["NewQueue"];
            };
        };
        responses: {
            /** @description Queue entry created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Queue"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            /** @description Patient is already queued for an active visit */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            500: components["responses"]["InternalServerError"];
        };
    };
    getQueue: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                queueId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Queue entry found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Queue"];
                };
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    deleteQueue: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                queueId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Queue entry deleted */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            /** @description Queue entry cannot be deleted in its current state */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            500: components["responses"]["InternalServerError"];
        };
    };
    updateQueue: {
        parameters: {
            query?: never;
            header: {
                /**
                 * @description Current resource `version` for optimistic locking. The update is rejected
                 *     with `412` when it does not match the stored version.
                 */
                "If-Match": components["parameters"]["IfMatch"];
            };
            path: {
                queueId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateQueue"];
            };
        };
        responses: {
            /** @description Queue entry updated */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Queue"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            /** @description Invalid status transition */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            412: components["responses"]["PreconditionFailed"];
            500: components["responses"]["InternalServerError"];
        };
    };
    listVisits: {
        parameters: {
            query?: {
                /** @description Maximum number of records to return. */
                limit?: components["parameters"]["Limit"];
                /** @description Number of records to skip before returning results. */
                offset?: paths["/v1/users"]["get"]["parameters"]["query"]["offset"];
                patientId?: string;
                status?: "planned" | "arrived" | "triaged" | "in-progress" | "finished" | "cancelled";
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A list of visits */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Visit"][];
                };
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            500: components["responses"]["InternalServerError"];
        };
    };
    getVisit: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                visitId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Visit found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Visit"];
                };
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    listFollowUpVisits: {
        parameters: {
            query?: {
                /** @description Maximum number of records to return. */
                limit?: components["parameters"]["Limit"];
                /** @description Number of records to skip before returning results. */
                offset?: paths["/v1/users"]["get"]["parameters"]["query"]["offset"];
                patientId?: string;
                status?: "booked" | "arrived" | "fulfilled" | "cancelled" | "noshow";
                /** @description Scheduled date/time of the return visit. */
                date?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A list of follow-up visits */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["FollowUpVisit"][];
                };
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            500: components["responses"]["InternalServerError"];
        };
    };
    createFollowUpVisit: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["NewFollowUpVisit"];
            };
        };
        responses: {
            /** @description Follow-up visit created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["FollowUpVisit"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    getFollowUpVisit: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                followUpVisitId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Follow-up visit found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["FollowUpVisit"];
                };
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    updateFollowUpVisit: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                followUpVisitId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateFollowUpVisit"];
            };
        };
        responses: {
            /** @description Follow-up visit updated */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["FollowUpVisit"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            /** @description Invalid status transition */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            500: components["responses"]["InternalServerError"];
        };
    };
    listObservations: {
        parameters: {
            query?: {
                /** @description Maximum number of records to return. */
                limit?: components["parameters"]["Limit"];
                /** @description Number of records to skip before returning results. */
                offset?: paths["/v1/users"]["get"]["parameters"]["query"]["offset"];
                patientId?: string;
                visitId?: string;
                status?: "preliminary" | "final" | "amended" | "cancelled" | "entered-in-error";
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A list of observations */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Observation"][];
                };
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            500: components["responses"]["InternalServerError"];
        };
    };
    createObservation: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["NewObservation"];
            };
        };
        responses: {
            /** @description Observation created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Observation"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    getObservation: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                observationId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Observation found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Observation"];
                };
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    deleteObservation: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                observationId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Observation deleted */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            /** @description Observation is already in a terminal state */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            500: components["responses"]["InternalServerError"];
        };
    };
    updateObservation: {
        parameters: {
            query?: never;
            header: {
                /**
                 * @description Current resource `version` for optimistic locking. The update is rejected
                 *     with `412` when it does not match the stored version.
                 */
                "If-Match": components["parameters"]["IfMatch"];
            };
            path: {
                observationId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateObservation"];
            };
        };
        responses: {
            /** @description Observation updated */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Observation"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            412: components["responses"]["PreconditionFailed"];
            500: components["responses"]["InternalServerError"];
        };
    };
    updateObservationStatus: {
        parameters: {
            query?: never;
            header: {
                /**
                 * @description Current resource `version` for optimistic locking. The update is rejected
                 *     with `412` when it does not match the stored version.
                 */
                "If-Match": components["parameters"]["IfMatch"];
            };
            path: {
                observationId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ObservationStatusUpdate"];
            };
        };
        responses: {
            /** @description Observation status updated */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Observation"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            /** @description Invalid status transition */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            412: components["responses"]["PreconditionFailed"];
            500: components["responses"]["InternalServerError"];
        };
    };
    listConditions: {
        parameters: {
            query?: {
                /** @description Maximum number of records to return. */
                limit?: components["parameters"]["Limit"];
                /** @description Number of records to skip before returning results. */
                offset?: paths["/v1/users"]["get"]["parameters"]["query"]["offset"];
                patientId?: string;
                visitId?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A list of conditions */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Condition"][];
                };
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            500: components["responses"]["InternalServerError"];
        };
    };
    createCondition: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["NewCondition"];
            };
        };
        responses: {
            /** @description Condition created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Condition"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    getCondition: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                conditionId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Condition found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Condition"];
                };
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    deleteCondition: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                conditionId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Condition deleted */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    updateCondition: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                conditionId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateCondition"];
            };
        };
        responses: {
            /** @description Condition updated */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Condition"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    listProcedures: {
        parameters: {
            query?: {
                /** @description Maximum number of records to return. */
                limit?: components["parameters"]["Limit"];
                /** @description Number of records to skip before returning results. */
                offset?: paths["/v1/users"]["get"]["parameters"]["query"]["offset"];
                patientId?: string;
                visitId?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A list of procedures */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Procedure"][];
                };
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            500: components["responses"]["InternalServerError"];
        };
    };
    createProcedure: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["NewProcedure"];
            };
        };
        responses: {
            /** @description Procedure created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Procedure"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    getProcedure: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                procedureId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Procedure found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Procedure"];
                };
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    deleteProcedure: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                procedureId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Procedure deleted */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    updateProcedure: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                procedureId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateProcedure"];
            };
        };
        responses: {
            /** @description Procedure updated */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Procedure"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    listProducts: {
        parameters: {
            query?: {
                /** @description Maximum number of records to return. */
                limit?: components["parameters"]["Limit"];
                /** @description Number of records to skip before returning results. */
                offset?: paths["/v1/users"]["get"]["parameters"]["query"]["offset"];
                /** @description Search by name or code. */
                query?: string;
                manufacturerId?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A list of products */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Product"][];
                };
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            500: components["responses"]["InternalServerError"];
        };
    };
    createProduct: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["NewProduct"];
            };
        };
        responses: {
            /** @description Product created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Product"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            /** @description Duplicate product code */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            500: components["responses"]["InternalServerError"];
        };
    };
    getProduct: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                productId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Product found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Product"];
                };
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    deleteProduct: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                productId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Product deleted */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            /** @description Product is still referenced by the catalog */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            500: components["responses"]["InternalServerError"];
        };
    };
    updateProduct: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                productId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateProduct"];
            };
        };
        responses: {
            /** @description Product updated */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Product"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    listManufacturers: {
        parameters: {
            query?: {
                /** @description Maximum number of records to return. */
                limit?: components["parameters"]["Limit"];
                /** @description Number of records to skip before returning results. */
                offset?: paths["/v1/users"]["get"]["parameters"]["query"]["offset"];
                /** @description Search by name or identifier. */
                query?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A list of manufacturers */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Manufacturer"][];
                };
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            500: components["responses"]["InternalServerError"];
        };
    };
    createManufacturer: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["NewManufacturer"];
            };
        };
        responses: {
            /** @description Manufacturer created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Manufacturer"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            /** @description Duplicate manufacturer identifier */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            500: components["responses"]["InternalServerError"];
        };
    };
    getManufacturer: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                manufacturerId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Manufacturer found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Manufacturer"];
                };
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    deleteManufacturer: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                manufacturerId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Manufacturer deleted */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            /** @description Manufacturer is still referenced by a product */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            500: components["responses"]["InternalServerError"];
        };
    };
    updateManufacturer: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                manufacturerId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateManufacturer"];
            };
        };
        responses: {
            /** @description Manufacturer updated */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Manufacturer"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    listUsers: {
        parameters: {
            query?: {
                /** @description Maximum number of records to return. */
                limit?: components["parameters"]["Limit"];
                /** @description Number of records to skip before returning results. */
                offset?: number;
                /** @description Search by name or email. */
                query?: string;
                /** @description Filter users by role. */
                roleId?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A list of users */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["User"][];
                };
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            500: components["responses"]["InternalServerError"];
        };
    };
    createUser: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["NewUser"];
            };
        };
        responses: {
            /** @description User created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["User"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            /** @description Email already in use */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            500: components["responses"]["InternalServerError"];
        };
    };
    getUser: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                userId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description User found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["User"];
                };
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    deleteUser: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                userId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description User deleted */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            /** @description Cannot delete your own account */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            500: components["responses"]["InternalServerError"];
        };
    };
    updateUser: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                userId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateUser"];
            };
        };
        responses: {
            /** @description User updated */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["User"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            /** @description Email already in use */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            500: components["responses"]["InternalServerError"];
        };
    };
    listRoles: {
        parameters: {
            query?: {
                /** @description Maximum number of records to return. */
                limit?: components["parameters"]["Limit"];
                /** @description Number of records to skip before returning results. */
                offset?: paths["/v1/users"]["get"]["parameters"]["query"]["offset"];
                /** @description Search by role name. */
                query?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A list of roles */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Role"][];
                };
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            500: components["responses"]["InternalServerError"];
        };
    };
    createRole: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["NewRole"];
            };
        };
        responses: {
            /** @description Role created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Role"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            /** @description Role name already in use */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            500: components["responses"]["InternalServerError"];
        };
    };
    getRole: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                roleId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Role found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Role"];
                };
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    deleteRole: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                roleId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Role deleted */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            /** @description System role cannot be deleted / role still assigned to users */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            500: components["responses"]["InternalServerError"];
        };
    };
    updateRole: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                roleId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateRole"];
            };
        };
        responses: {
            /** @description Role updated */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Role"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            /** @description System role cannot be modified / role name already in use */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            500: components["responses"]["InternalServerError"];
        };
    };
    listConditionReferences: {
        parameters: {
            query?: {
                /** @description Maximum number of records to return. */
                limit?: components["parameters"]["Limit"];
                /** @description Number of records to skip before returning results. */
                offset?: paths["/v1/users"]["get"]["parameters"]["query"]["offset"];
                /** @description Search by code or display name. */
                query?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A list of condition references */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ConditionReference"][];
                };
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            500: components["responses"]["InternalServerError"];
        };
    };
    createConditionReference: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["NewConditionReference"];
            };
        };
        responses: {
            /** @description Condition reference created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ConditionReference"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            /** @description Duplicate code */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            500: components["responses"]["InternalServerError"];
        };
    };
    getConditionReference: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                conditionReferenceId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Condition reference found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ConditionReference"];
                };
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    deleteConditionReference: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                conditionReferenceId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Condition reference deleted */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            /** @description Reference is still in use by a clinical Condition */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            500: components["responses"]["InternalServerError"];
        };
    };
    updateConditionReference: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                conditionReferenceId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateConditionReference"];
            };
        };
        responses: {
            /** @description Condition reference updated */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ConditionReference"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    listProcedureReferences: {
        parameters: {
            query?: {
                /** @description Maximum number of records to return. */
                limit?: components["parameters"]["Limit"];
                /** @description Number of records to skip before returning results. */
                offset?: paths["/v1/users"]["get"]["parameters"]["query"]["offset"];
                /** @description Search by code or display name. */
                query?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A list of procedure references */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProcedureReference"][];
                };
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            500: components["responses"]["InternalServerError"];
        };
    };
    createProcedureReference: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["NewProcedureReference"];
            };
        };
        responses: {
            /** @description Procedure reference created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProcedureReference"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            /** @description Duplicate code */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            500: components["responses"]["InternalServerError"];
        };
    };
    getProcedureReference: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                procedureReferenceId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Procedure reference found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProcedureReference"];
                };
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    deleteProcedureReference: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                procedureReferenceId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Procedure reference deleted */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            /** @description Reference is still in use by a clinical Procedure */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            500: components["responses"]["InternalServerError"];
        };
    };
    updateProcedureReference: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                procedureReferenceId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateProcedureReference"];
            };
        };
        responses: {
            /** @description Procedure reference updated */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProcedureReference"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
}
