import { createFileRoute } from "@tanstack/react-router";
import { QueueList } from "@/features/queues/components/queue-list";

export const Route = createFileRoute("/_authenticated/queues/")({
  component: QueueList,
});
