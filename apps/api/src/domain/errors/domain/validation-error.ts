import { DomainError } from "./domain-error.js";

export class ValidationError extends DomainError {
  code = "VALIDATION_ERROR";
  message = "Invalid input";
}
