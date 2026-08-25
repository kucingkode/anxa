import { DomainError } from "./domain-error.js";

export class ForbiddenError extends DomainError {
  code = "FORBIDDEN";
  message = "Insufficient permissions";
}