import createClient, { type ClientOptions } from "openapi-fetch";
import type { components, paths } from "./generated/schema.js";
import spec from "./generated/openapi.json";

export type { components, paths };
export type Operations = keyof paths;

export type Health = components["schemas"]["Health"];
export type Error = components["schemas"]["Error"];

export type Patient = components["schemas"]["Patient"];
export type NewPatient = components["schemas"]["NewPatient"];
export type UpdatePatient = components["schemas"]["UpdatePatient"];

export type LoginRequest = components["schemas"]["LoginRequest"];
export type LoginResponse = components["schemas"]["LoginResponse"];
export type RefreshResponse = components["schemas"]["RefreshResponse"];
export type AuthUser = components["schemas"]["AuthUser"];
export type Role = components["schemas"]["Role"];
export type NewRole = components["schemas"]["NewRole"];
export type UpdateRole = components["schemas"]["UpdateRole"];
export type User = components["schemas"]["User"];
export type NewUser = components["schemas"]["NewUser"];
export type UpdateUser = components["schemas"]["UpdateUser"];

export type Queue = components["schemas"]["Queue"];
export type NewQueue = components["schemas"]["NewQueue"];
export type UpdateQueue = components["schemas"]["UpdateQueue"];

export type Visit = components["schemas"]["Visit"];

export type FollowUpVisit = components["schemas"]["FollowUpVisit"];
export type NewFollowUpVisit = components["schemas"]["NewFollowUpVisit"];
export type UpdateFollowUpVisit = components["schemas"]["UpdateFollowUpVisit"];

export type Observation = components["schemas"]["Observation"];
export type NewObservation = components["schemas"]["NewObservation"];
export type UpdateObservation = components["schemas"]["UpdateObservation"];
export type ObservationStatusUpdate = components["schemas"]["ObservationStatusUpdate"];

export type Condition = components["schemas"]["Condition"];
export type NewCondition = components["schemas"]["NewCondition"];
export type UpdateCondition = components["schemas"]["UpdateCondition"];

export type Procedure = components["schemas"]["Procedure"];
export type NewProcedure = components["schemas"]["NewProcedure"];
export type UpdateProcedure = components["schemas"]["UpdateProcedure"];

export type ConditionReference = components["schemas"]["ConditionReference"];
export type NewConditionReference = components["schemas"]["NewConditionReference"];
export type UpdateConditionReference = components["schemas"]["UpdateConditionReference"];

export type ProcedureReference = components["schemas"]["ProcedureReference"];
export type NewProcedureReference = components["schemas"]["NewProcedureReference"];
export type UpdateProcedureReference = components["schemas"]["UpdateProcedureReference"];

export type Product = components["schemas"]["Product"];
export type NewProduct = components["schemas"]["NewProduct"];
export type UpdateProduct = components["schemas"]["UpdateProduct"];

export type Manufacturer = components["schemas"]["Manufacturer"];
export type NewManufacturer = components["schemas"]["NewManufacturer"];
export type UpdateManufacturer = components["schemas"]["UpdateManufacturer"];

/** The canonical OpenAPI 3.1 document (source of truth). */
export const openapiSpec = spec;

export const DEFAULT_API_BASE_URL = "http://localhost:3000";

/** Typed fetch client generated from the OpenAPI contract. */
export function createApiClient(
  baseUrl = DEFAULT_API_BASE_URL,
  options: ClientOptions = {},
) {
  return createClient<paths>({ ...options, baseUrl });
}

export type ApiClient = ReturnType<typeof createApiClient>;
