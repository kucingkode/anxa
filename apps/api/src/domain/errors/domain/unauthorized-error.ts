import { DomainError } from "./domain-error.js";

export class UnauthorizedError extends DomainError {
  code = "UNAUTHORIZED";
  message = "Authentication required";
}