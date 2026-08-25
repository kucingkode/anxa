import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { VISIT_STATUS_LABELS } from "@/lib/labels";
import { getErrorMessage } from "@/lib/errors";
import { useVisit } from "@/features/visits/hooks/use-visits";
import { ObservationList } from "@/features/observations/components/observation-list";
import { ConditionList } from "@/features/conditions/components/condition-list";
import { ProcedureList } from "@/features/procedures/components/procedure-list";

export function VisitDetail({ patientId, visitId }: { patientId: string; visitId: string }) {
  const { data: visit, isLoading, isError, error } = useVisit(visitId);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm">
        <Link to="/patients/$patientId/visits" params={{ patientId }}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Link>
      </Button>

      {isLoading && <Skeleton className="h-24 w-full" />}
      {isError && <p className="text-sm text-destructive">{getErrorMessage(error, "Gagal memuat data kunjungan")}</p>}
      {visit && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Kunjungan
              <Badge variant="outline">{VISIT_STATUS_LABELS[visit.status] ?? visit.status}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Kelas</span>
              <span className="font-medium">{visit.class}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mulai</span>
              <span>{visit.periodStart ?? "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Selesai</span>
              <span>{visit.periodEnd ?? "—"}</span>
            </div>
          </CardContent>
        </Card>
      )}

      <ObservationList patientId={patientId} visitId={visitId} />
      <ConditionList patientId={patientId} visitId={visitId} />
      <ProcedureList patientId={patientId} visitId={visitId} />
    </div>
  );
}
