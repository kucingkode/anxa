import { createFileRoute } from "@tanstack/react-router";
import { ConditionReferenceList } from "@/features/condition-references/components/condition-reference-list";

export const Route = createFileRoute("/_authenticated/references/conditions/")({
  component: ConditionReferenceList,
});
