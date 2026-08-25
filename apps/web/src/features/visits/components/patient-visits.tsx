import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import type { FollowUpVisit, Visit } from "@simk/contracts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { FOLLOW_UP_STATUS_LABELS, VISIT_STATUS_LABELS } from "@/lib/labels";
import { getErrorMessage } from "@/lib/errors";
import { useAuth } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { usePatientVisits } from "../hooks/use-visits";
import { useFollowUpVisits, useUpdateFollowUpVisit } from "@/features/follow-up-visits/hooks/use-follow-up-visits";
import { FollowUpVisitForm } from "@/features/follow-up-visits/components/follow-up-visit-form";

const VISIT_STATUS_VARIANT: Record<Visit["status"], "default" | "secondary" | "success" | "destructive"> = {
  planned: "secondary",
  arrived: "default",
  triaged: "default",
  "in-progress": "default",
  finished: "success",
  cancelled: "destructive",
};

const FOLLOW_UP_TRANSITIONS: Record<FollowUpVisit["status"], FollowUpVisit["status"][]> = {
  booked: ["arrived", "cancelled", "noshow"],
  arrived: ["fulfilled"],
  fulfilled: [],
  cancelled: [],
  noshow: [],
};

const FOLLOW_UP_STATUS_VARIANT: Record<FollowUpVisit["status"], "default" | "secondary" | "success" | "destructive"> = {
  booked: "secondary",
  arrived: "default",
  fulfilled: "success",
  cancelled: "destructive",
  noshow: "destructive",
};

export function PatientVisits({ patientId }: { patientId: string }) {
  const { user } = useAuth();
  const canManage = hasPermission(user, "follow-up-visits:write");
  const [formOpen, setFormOpen] = useState(false);

  const { data: visits, isLoading, isError, error } = usePatientVisits(patientId);
  const {
    data: followUps,
    isLoading: followUpsLoading,
    isError: followUpsError,
    error: followUpsErrorMessage,
  } = useFollowUpVisits({ patientId });
  const updateMutation = useUpdateFollowUpVisit();

  const handleStatusChange = (followUp: FollowUpVisit, status: FollowUpVisit["status"]) => {
    updateMutation.mutate(
      { id: followUp.id, payload: { status } },
      {
        onSuccess: () => toast.success("Status kunjungan lanjutan diperbarui"),
        onError: (err) => toast.error(getErrorMessage(err, "Gagal mengubah status kunjungan lanjutan")),
      },
    );
  };

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Kunjungan</h2>
        {isError && <p className="text-sm text-destructive">{getErrorMessage(error, "Gagal memuat data kunjungan")}</p>}
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Mulai</TableHead>
                  <TableHead>Selesai</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visits?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      Tidak ada kunjungan.
                    </TableCell>
                  </TableRow>
                )}
                {visits?.map((visit) => (
                  <TableRow key={visit.id}>
                    <TableCell>
                      <Link
                        to="/patients/$patientId/visits/$visitId"
                        params={{ patientId, visitId: visit.id }}
                        className="hover:underline"
                      >
                        <Badge variant={VISIT_STATUS_VARIANT[visit.status]}>
                          {VISIT_STATUS_LABELS[visit.status] ?? visit.status}
                        </Badge>
                      </Link>
                    </TableCell>
                    <TableCell>{visit.class}</TableCell>
                    <TableCell>{visit.periodStart ?? "—"}</TableCell>
                    <TableCell>{visit.periodEnd ?? "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Kunjungan Lanjutan</h2>
          {canManage && (
            <Button onClick={() => setFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Kunjungan Lanjutan
            </Button>
          )}
        </div>
        {followUpsError && (
          <p className="text-sm text-destructive">{getErrorMessage(followUpsErrorMessage, "Gagal memuat data kunjungan lanjutan")}</p>
        )}
        {followUpsLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Alasan</TableHead>
                  {canManage && <TableHead className="text-right">Aksi</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {followUps?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={canManage ? 4 : 3} className="text-center text-muted-foreground">
                      Tidak ada kunjungan lanjutan.
                    </TableCell>
                  </TableRow>
                )}
                {followUps?.map((followUp) => {
                  const nextStatuses = FOLLOW_UP_TRANSITIONS[followUp.status];
                  return (
                    <TableRow key={followUp.id}>
                      <TableCell>{followUp.date}</TableCell>
                      <TableCell>
                        <Badge variant={FOLLOW_UP_STATUS_VARIANT[followUp.status]}>
                          {FOLLOW_UP_STATUS_LABELS[followUp.status] ?? followUp.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{followUp.reason ?? "—"}</TableCell>
                      {canManage && (
                        <TableCell className="text-right">
                          {nextStatuses.length > 0 ? (
                            <Select onValueChange={(v) => handleStatusChange(followUp, v as FollowUpVisit["status"])}>
                              <SelectTrigger className="w-32" aria-label={`Ubah status kunjungan lanjutan ${followUp.date}`}>
                                <SelectValue placeholder="Ubah status" />
                              </SelectTrigger>
                              <SelectContent>
                                {nextStatuses.map((status) => (
                                  <SelectItem key={status} value={status}>
                                    {FOLLOW_UP_STATUS_LABELS[status]}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        )}
      </section>

      <FollowUpVisitForm open={formOpen} onOpenChange={setFormOpen} patientId={patientId} />
    </div>
  );
}
