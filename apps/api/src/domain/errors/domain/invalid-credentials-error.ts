import { DomainError } from "./domain-error.js";

export class InvalidCredentialsError extends DomainError {
  code = "INVALID_CREDENTIALS";
  message = "Invalid email or password";
}