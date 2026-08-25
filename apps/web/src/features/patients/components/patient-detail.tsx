import { Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { GENDER_LABELS } from "@/lib/labels";
import { getErrorMessage } from "@/lib/errors";
import { usePatient } from "../hooks/use-patients";

export function PatientDetail({ patientId }: { patientId: string }) {
  const { data: patient, isLoading, isError, error } = usePatient(patientId);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (isError || !patient) {
    return <p className="text-sm text-destructive">{getErrorMessage(error, "Gagal memuat data pasien")}</p>;
  }

  return (
    <div className="space-y-4">
      <Button asChild variant="ghost" size="sm">
        <Link to="/patients">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{patient.name}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">NIK / IHS</span>
            <span className="font-medium">{patient.identifier}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Jenis Kelamin</span>
            <Badge variant="outline">{GENDER_LABELS[patient.gender] ?? patient.gender}</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tanggal Lahir</span>
            <span>{patient.birthDate ?? "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Telepon</span>
            <span>{patient.phone ?? "—"}</span>
          </div>
        </CardContent>
      </Card>

      <Button asChild variant="outline" size="sm">
        <Link to="/patients/$patientId/visits" params={{ patientId: patient.id }}>
          <CalendarClock className="mr-2 h-4 w-4" />
          Riwayat Kunjungan
        </Link>
      </Button>
    </div>
  );
}
