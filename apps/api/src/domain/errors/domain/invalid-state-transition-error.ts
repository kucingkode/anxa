import { DomainError } from "./domain-error.js";

export class InvalidStateTransitionError extends DomainError {
  code = "INVALID_STATE_TRANSITION";
  message = "Invalid state transition";
}
