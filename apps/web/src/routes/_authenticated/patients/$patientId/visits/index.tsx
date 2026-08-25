import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PatientVisits } from "@/features/visits/components/patient-visits";

export const Route = createFileRoute("/_authenticated/patients/$patientId/visits/")({
  component: () => {
    const { patientId } = Route.useParams();
    return (
      <div className="space-y-4">
        <Button asChild variant="ghost" size="sm">
          <Link to="/patients/$patientId" params={{ patientId }}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Link>
        </Button>
        <PatientVisits patientId={patientId} />
      </div>
    );
  },
});
