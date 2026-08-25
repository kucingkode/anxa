import { createFileRoute } from "@tanstack/react-router";
import { ProcedureReferenceList } from "@/features/procedure-references/components/procedure-reference-list";

export const Route = createFileRoute("/_authenticated/references/procedures/")({
  component: ProcedureReferenceList,
});
