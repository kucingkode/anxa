import { DomainError } from "./domain-error.js";

export class NotFoundError extends DomainError {
  code = "NOT_FOUND";
  message = "Not found";
}
