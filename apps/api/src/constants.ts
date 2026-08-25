import type { TxConfig } from "./domain/ports/out/database/database.js";

export const SERVICE_NAME = "api";
export const SERVICE_VERSION = "0.1.0";

export const READ_ONLY_DB_TX: TxConfig = {
  accessMode: "read only",
};

export const cacheNamespaces = {
  PATIENTS: "patients",
};

// ===============================
// Port Directions
// ===============================

export const INBOUND_DIRECTION = "inbound";
export const OUTBOUND_DIRECTION = "outbound";

// ===============================
// Inbound Ports
// ===============================

export const REST_SERVER_PORT = "rest-server";

// ===============================
// Outbound ports
// ===============================

export const DATABASE_PORT = "database";
export const PATIENTS_REPOSITORY_PORT = "patients-repository";
export const QUEUES_REPOSITORY_PORT = "queues-repository";
export const VISITS_REPOSITORY_PORT = "visits-repository";
export const OBSERVATIONS_REPOSITORY_PORT = "observations-repository";
export const CONDITIONS_REPOSITORY_PORT = "conditions-repository";
export const PROCEDURES_REPOSITORY_PORT = "procedures-repository";
export const FOLLOW_UP_VISITS_REPOSITORY_PORT = "follow-up-visits-repository";
export const USERS_REPOSITORY_PORT = "users-repository";
export const ROLES_REPOSITORY_PORT = "roles-repository";
export const REFRESH_TOKENS_REPOSITORY_PORT = "refresh-tokens-repository";
export const PRODUCTS_REPOSITORY_PORT = "products-repository";
export const MANUFACTURERS_REPOSITORY_PORT = "manufacturers-repository";
export const CONDITION_REFERENCES_REPOSITORY_PORT = "condition-references-repository";
export const PROCEDURE_REFERENCES_REPOSITORY_PORT = "procedure-references-repository";
export const SATUSEHAT_PORT = "satusehat";
export const CACHE_PORT = "cache";
export const AUTH_PORT = "auth";

// ===============================
// Use Cases
// ===============================

export const CREATE_PATIENT_USE_CASE = "create-patient";
export const DELETE_PATIENT_USE_CASE = "delete-patient";
export const GET_PATIENT_USE_CASE = "get-patient";
export const LIST_PATIENTS_USE_CASE = "list-patients";
export const UPDATE_PATIENT_USE_CASE = "update-patient";

export const CREATE_QUEUE_USE_CASE = "create-queue";
export const DELETE_QUEUE_USE_CASE = "delete-queue";
export const GET_QUEUE_USE_CASE = "get-queue";
export const LIST_QUEUES_USE_CASE = "list-queues";
export const UPDATE_QUEUE_USE_CASE = "update-queue";

export const GET_VISIT_USE_CASE = "get-visit";
export const LIST_VISITS_USE_CASE = "list-visits";

export const CREATE_OBSERVATION_USE_CASE = "create-observation";
export const DELETE_OBSERVATION_USE_CASE = "delete-observation";
export const GET_OBSERVATION_USE_CASE = "get-observation";
export const LIST_OBSERVATIONS_USE_CASE = "list-observations";
export const UPDATE_OBSERVATION_USE_CASE = "update-observation";
export const UPDATE_OBSERVATION_STATUS_USE_CASE = "update-observation-status";

export const CREATE_CONDITION_USE_CASE = "create-condition";
export const DELETE_CONDITION_USE_CASE = "delete-condition";
export const GET_CONDITION_USE_CASE = "get-condition";
export const LIST_CONDITIONS_USE_CASE = "list-conditions";
export const UPDATE_CONDITION_USE_CASE = "update-condition";

export const CREATE_PROCEDURE_USE_CASE = "create-procedure";
export const DELETE_PROCEDURE_USE_CASE = "delete-procedure";
export const GET_PROCEDURE_USE_CASE = "get-procedure";
export const LIST_PROCEDURES_USE_CASE = "list-procedures";
export const UPDATE_PROCEDURE_USE_CASE = "update-procedure";

export const CREATE_FOLLOW_UP_VISIT_USE_CASE = "create-follow-up-visit";
export const GET_FOLLOW_UP_VISIT_USE_CASE = "get-follow-up-visit";
export const LIST_FOLLOW_UP_VISITS_USE_CASE = "list-follow-up-visits";
export const UPDATE_FOLLOW_UP_VISIT_USE_CASE = "update-follow-up-visit";

export const CREATE_USER_USE_CASE = "create-user";
export const DELETE_USER_USE_CASE = "delete-user";
export const GET_USER_USE_CASE = "get-user";
export const LIST_USERS_USE_CASE = "list-users";
export const UPDATE_USER_USE_CASE = "update-user";

export const CREATE_ROLE_USE_CASE = "create-role";
export const DELETE_ROLE_USE_CASE = "delete-role";
export const GET_ROLE_USE_CASE = "get-role";
export const LIST_ROLES_USE_CASE = "list-roles";
export const UPDATE_ROLE_USE_CASE = "update-role";

export const CREATE_PRODUCT_USE_CASE = "create-product";
export const DELETE_PRODUCT_USE_CASE = "delete-product";
export const GET_PRODUCT_USE_CASE = "get-product";
export const LIST_PRODUCTS_USE_CASE = "list-products";
export const UPDATE_PRODUCT_USE_CASE = "update-product";

export const CREATE_MANUFACTURER_USE_CASE = "create-manufacturer";
export const DELETE_MANUFACTURER_USE_CASE = "delete-manufacturer";
export const GET_MANUFACTURER_USE_CASE = "get-manufacturer";
export const LIST_MANUFACTURERS_USE_CASE = "list-manufacturers";
export const UPDATE_MANUFACTURER_USE_CASE = "update-manufacturer";

export const CREATE_CONDITION_REFERENCE_USE_CASE = "create-condition-reference";
export const DELETE_CONDITION_REFERENCE_USE_CASE = "delete-condition-reference";
export const GET_CONDITION_REFERENCE_USE_CASE = "get-condition-reference";
export const LIST_CONDITION_REFERENCES_USE_CASE = "list-condition-references";
export const UPDATE_CONDITION_REFERENCE_USE_CASE = "update-condition-reference";

export const CREATE_PROCEDURE_REFERENCE_USE_CASE = "create-procedure-reference";
export const DELETE_PROCEDURE_REFERENCE_USE_CASE = "delete-procedure-reference";
export const GET_PROCEDURE_REFERENCE_USE_CASE = "get-procedure-reference";
export const LIST_PROCEDURE_REFERENCES_USE_CASE = "list-procedure-references";
export const UPDATE_PROCEDURE_REFERENCE_USE_CASE = "update-procedure-reference";

export const LOGIN_USE_CASE = "login";
export const LOGOUT_USE_CASE = "logout";
export const VERIFY_TOKEN_USE_CASE = "verify-token";
export const REFRESH_TOKEN_USE_CASE = "refresh-token";
export const GET_AUTH_USER_USE_CASE = "get-auth-user";
