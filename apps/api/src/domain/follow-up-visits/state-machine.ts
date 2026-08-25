import type { FollowUpVisit } from "@simk/contracts";

export type FollowUpVisitStatus = FollowUpVisit["status"];

/**
 * Follow-up visit state machine (PRD §4):
 * `booked → arrived → fulfilled`; `booked → cancelled` or `noshow`.
 * `fulfilled`, `cancelled` and `noshow` are terminal.
 */
const ALLOWED_TRANSITIONS: Record<FollowUpVisitStatus, FollowUpVisitStatus[]> = {
  booked: ["arrived", "cancelled", "noshow"],
  arrived: ["fulfilled"],
  fulfilled: [],
  cancelled: [],
  noshow: [],
};

export function canTransition(
  from: FollowUpVisitStatus,
  to: FollowUpVisitStatus,
): boolean {
  return ALLOWED_TRANSITIONS[from].includes(to);
}
