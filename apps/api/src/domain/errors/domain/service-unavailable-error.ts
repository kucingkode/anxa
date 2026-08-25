import { DomainError } from "./domain-error.js";

export class ServiceUnavailableError extends DomainError {
  code = "SERVICE_UNAVAILABLE";
  message = "Service temporarily unavailable";
}
