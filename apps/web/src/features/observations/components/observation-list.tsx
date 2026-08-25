import { useState } from "react";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { Observation } from "@simk/contracts";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { OBSERVATION_STATUS_LABELS } from "@/lib/labels";
import { getErrorMessage } from "@/lib/errors";
import { notifyMutationError } from "@/lib/optimistic-lock";
import { useAuth } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { useQueryClient } from "@tanstack/react-query";
import {
  observationsKey,
  useDeleteObservation,
  useObservations,
  useUpdateObservationStatus,
} from "../hooks/use-observations";
import { ObservationForm } from "./observation-form";

const OBSERVATION_TRANSITIONS: Record<Observation["status"], Observation["status"][]> = {
  preliminary: ["final", "cancelled", "entered-in-error"],
  final: ["amended", "cancelled", "entered-in-error"],
  amended: [],
  cancelled: [],
  "entered-in-error": [],
};

const OBSERVATION_STATUS_VARIANT: Record<Observation["status"], "default" | "secondary" | "success" | "destructive"> = {
  preliminary: "secondary",
  final: "success",
  amended: "default",
  cancelled: "destructive",
  "entered-in-error": "destructive",
};

interface ObservationListProps {
  patientId: string;
  visitId: string;
}

export function ObservationList({ patientId, visitId }: ObservationListProps) {
  const { user } = useAuth();
  const canEdit = hasPermission(user, "observations:write");
  const canDelete = hasPermission(user, "observations:delete");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Observation | undefined>(undefined);
  const queryClient = useQueryClient();

  const { data: observations, isLoading, isError, error } = useObservations({ visitId, patientId });
  const statusMutation = useUpdateObservationStatus();
  const deleteMutation = useDeleteObservation();

  const handleStatusChange = (observation: Observation, status: Observation["status"]) => {
    statusMutation.mutate(
      { id: observation.id, version: observation.version, status: { status } },
      {
        onSuccess: () => toast.success("Status observasi diperbarui"),
        onError: (err) =>
          notifyMutationError(err, "Gagal mengubah status observasi", () =>
            queryClient.invalidateQueries({ queryKey: observationsKey }),
          ),
      },
    );
  };

  const handleDelete = (observation: Observation) => {
    deleteMutation.mutate(observation.id, {
      onSuccess: () => toast.success("Observasi dihapus"),
      onError: (err) => toast.error(getErrorMessage(err, "Gagal menghapus observasi")),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Observasi</h2>
        {canEdit && (
          <Button onClick={() => { setEditing(undefined); setFormOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Observasi
          </Button>
        )}
      </div>

      {isError && <p className="text-sm text-destructive">{getErrorMessage(error, "Gagal memuat data observasi")}</p>}
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kode</TableHead>
              <TableHead>Nilai</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Interpretasi</TableHead>
              {(canEdit || canDelete) && <TableHead className="text-right">Aksi</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {observations?.length === 0 && (
              <TableRow>
                <TableCell colSpan={canEdit || canDelete ? 5 : 4} className="text-center text-muted-foreground">
                  Tidak ada observasi.
                </TableCell>
              </TableRow>
            )}
            {observations?.map((observation) => {
              const nextStatuses = OBSERVATION_TRANSITIONS[observation.status];
              return (
                <TableRow key={observation.id}>
                  <TableCell className="font-medium">
                    <div>{observation.code}</div>
                    {observation.codeDisplay && (
                      <div className="text-xs text-muted-foreground">{observation.codeDisplay}</div>
                    )}
                  </TableCell>
                  <TableCell>
                    {observation.value}
                    {observation.unit ? ` ${observation.unit}` : ""}
                  </TableCell>
                  <TableCell>
                    <Badge variant={OBSERVATION_STATUS_VARIANT[observation.status]}>
                      {OBSERVATION_STATUS_LABELS[observation.status] ?? observation.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{observation.interpretation ?? "—"}</TableCell>
                  {(canEdit || canDelete) && (
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {canEdit && (nextStatuses.length > 0 ? (
                          <Select onValueChange={(v) => handleStatusChange(observation, v as Observation["status"])}>
                            <SelectTrigger className="w-32" aria-label={`Ubah status ${observation.code}`}>
                              <SelectValue placeholder="Ubah status" />
                            </SelectTrigger>
                            <SelectContent>
                              {nextStatuses.map((status) => (
                                <SelectItem key={status} value={status}>
                                  {OBSERVATION_STATUS_LABELS[status]}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        ))}
                        {canEdit && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => { setEditing(observation); setFormOpen(true); }}
                            aria-label={`Edit ${observation.code}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        )}
                        {canDelete && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" aria-label={`Hapus ${observation.code}`}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Hapus Observasi</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Yakin ingin menghapus observasi{" "}
                                  <span className="font-medium">{observation.code}</span>? Tindakan ini tidak dapat
                                  dibatalkan.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(observation)}>Hapus</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}

      <ObservationForm
        open={formOpen}
        onOpenChange={(open) => { setFormOpen(open); if (!open) setEditing(undefined); }}
        patientId={patientId}
        visitId={visitId}
        observation={editing}
      />
    </div>
  );
}
