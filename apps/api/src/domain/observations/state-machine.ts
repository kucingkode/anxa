import type { Observation } from "@simk/contracts";

export type ObservationStatus = Observation["status"];

/**
 * Observation state machine (PRD §4):
 * `preliminary → final → amended`; any non-terminal state → `cancelled` or
 * `entered-in-error`. `cancelled` and `entered-in-error` are terminal.
 */
const ALLOWED_TRANSITIONS: Record<ObservationStatus, ObservationStatus[]> = {
  preliminary: ["final", "cancelled", "entered-in-error"],
  final: ["amended", "cancelled", "entered-in-error"],
  amended: ["cancelled", "entered-in-error"],
  cancelled: [],
  "entered-in-error": [],
};

export function canTransition(
  from: ObservationStatus,
  to: ObservationStatus,
): boolean {
  return ALLOWED_TRANSITIONS[from].includes(to);
}

export function isTerminal(status: ObservationStatus): boolean {
  return status === "cancelled" || status === "entered-in-error";
}
