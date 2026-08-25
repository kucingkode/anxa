import { createFileRoute } from "@tanstack/react-router";
import { VisitDetail } from "@/features/visits/components/visit-detail";

export const Route = createFileRoute("/_authenticated/patients/$patientId/visits/$visitId")({
  component: () => {
    const { patientId, visitId } = Route.useParams();
    return <VisitDetail patientId={patientId} visitId={visitId} />;
  },
});