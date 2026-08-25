import { createFileRoute } from "@tanstack/react-router";
import { PatientList } from "@/features/patients/components/patient-list";

export const Route = createFileRoute("/_authenticated/patients/")({
  component: PatientList,
});