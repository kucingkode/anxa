import { createFileRoute } from "@tanstack/react-router";
import { PatientDetail } from "@/features/patients/components/patient-detail";

export const Route = createFileRoute("/_authenticated/patients/$patientId/")({
  component: () => {
    const { patientId } = Route.useParams();
    return <PatientDetail patientId={patientId} />;
  },
});