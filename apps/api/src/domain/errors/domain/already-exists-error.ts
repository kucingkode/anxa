import { DomainError } from "./domain-error.js";

export class AlreadyExistsError extends DomainError {
  code = "ALREADY_EXISTS";
  message = "Resource already exists";
}
