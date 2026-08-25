import { DomainError } from "./domain-error.js";

export class ConflictError extends DomainError {
  code = "CONFLICT";
  message = "Conflict with the current resource state";
}
