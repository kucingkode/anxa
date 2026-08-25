import { DomainError } from "./domain-error.js";

export class PreconditionFailedError extends DomainError {
  code = "PRECONDITION_FAILED";
  message = "Precondition failed (version mismatch)";
}
