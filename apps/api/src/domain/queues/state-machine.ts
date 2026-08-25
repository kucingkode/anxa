import type { Queue } from "@simk/contracts";

export type QueueStatus = Queue["status"];

/**
 * Queue state machine (PRD §4):
 * `waiting → in-service → done`; `waiting`/`in-service → cancelled`.
 * `done` and `cancelled` are terminal.
 */
const ALLOWED_TRANSITIONS: Record<QueueStatus, QueueStatus[]> = {
  waiting: ["in-service", "cancelled"],
  "in-service": ["done", "cancelled"],
  done: [],
  cancelled: [],
};

export function canTransition(from: QueueStatus, to: QueueStatus): boolean {
  return ALLOWED_TRANSITIONS[from].includes(to);
}
