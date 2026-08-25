import { useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import type { Queue } from "@simk/contracts";
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
import { QUEUE_STATUS_LABELS } from "@/lib/labels";
import { getErrorMessage } from "@/lib/errors";
import { notifyMutationError } from "@/lib/optimistic-lock";
import { usePagination } from "@/lib/hooks/use-pagination";
import { Pagination } from "@/components/ui/pagination";
import { useAuth } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { usePatients } from "@/features/patients/hooks/use-patients";
import { useDeleteQueue, useQueues, queuesKey, useUpdateQueue } from "../hooks/use-queues";
import { useQueryClient } from "@tanstack/react-query";
import { QueueForm } from "./queue-form";

const QUEUE_TRANSITIONS: Record<Queue["status"], Queue["status"][]> = {
  waiting: ["in-service", "cancelled"],
  "in-service": ["done", "cancelled"],
  done: [],
  cancelled: [],
};

const QUEUE_STATUS_VARIANT: Record<Queue["status"], "default" | "secondary" | "success" | "destructive"> = {
  waiting: "secondary",
  "in-service": "default",
  done: "success",
  cancelled: "destructive",
};

export function QueueList() {
  const { user } = useAuth();
  const canManage = hasPermission(user, "queues:write");
  const canDelete = hasPermission(user, "queues:delete");
  const [formOpen, setFormOpen] = useState(false);
  const queryClient = useQueryClient();
  const { offset, limit, page, hasPrevious, goToNext, goToPrevious } = usePagination(10);

  const { data: queues, isLoading, isError, error } = useQueues({ limit, offset });
  const { data: patients } = usePatients();
  const updateMutation = useUpdateQueue();
  const deleteMutation = useDeleteQueue();
  const hasNext = (queues?.length ?? 0) === limit;

  const patientName = (id: string) => patients?.find((p) => p.id === id)?.name ?? "—";

  const handleStatusChange = (queue: Queue, status: Queue["status"]) => {
    updateMutation.mutate(
      { id: queue.id, version: queue.version, payload: { status } },
      {
        onSuccess: () => toast.success("Status antrean diperbarui"),
        onError: (err) =>
          notifyMutationError(err, "Gagal mengubah status antrean", () =>
            queryClient.invalidateQueries({ queryKey: queuesKey }),
          ),
      },
    );
  };

  const handleDelete = (queue: Queue) => {
    deleteMutation.mutate(queue.id, {
      onSuccess: () => toast.success("Antrean dihapus"),
      onError: (err) => toast.error(getErrorMessage(err, "Gagal menghapus antrean")),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Antrean</h1>
        {canManage && (
          <Button onClick={() => setFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Antrean
          </Button>
        )}
      </div>

      {isError && <p className="text-sm text-destructive">{getErrorMessage(error, "Gagal memuat data antrean")}</p>}
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
              <TableHead>Pasien</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Version</TableHead>
              {(canManage || canDelete) && <TableHead className="text-right">Aksi</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {queues?.length === 0 && (
              <TableRow>
                <TableCell colSpan={canManage || canDelete ? 4 : 3} className="text-center text-muted-foreground">
                  Tidak ada antrean.
                </TableCell>
              </TableRow>
            )}
            {queues?.map((queue) => {
              const nextStatuses = QUEUE_TRANSITIONS[queue.status];
              return (
                <TableRow key={queue.id}>
                  <TableCell className="font-medium">{patientName(queue.patientId)}</TableCell>
                  <TableCell>
                    <Badge variant={QUEUE_STATUS_VARIANT[queue.status]}>
                      {QUEUE_STATUS_LABELS[queue.status] ?? queue.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{queue.version}</TableCell>
                  {(canManage || canDelete) && (
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {canManage && (nextStatuses.length > 0 ? (
                          <Select onValueChange={(v) => handleStatusChange(queue, v as Queue["status"])}>
                            <SelectTrigger className="w-32" aria-label={`Ubah status ${patientName(queue.patientId)}`}>
                              <SelectValue placeholder="Ubah status" />
                            </SelectTrigger>
                            <SelectContent>
                              {nextStatuses.map((status) => (
                                <SelectItem key={status} value={status}>
                                  {QUEUE_STATUS_LABELS[status]}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        ))}
                        {canDelete && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" aria-label={`Hapus ${patientName(queue.patientId)}`}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Hapus Antrean</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Yakin ingin menghapus antrean{" "}
                                  <span className="font-medium">{patientName(queue.patientId)}</span>? Tindakan ini
                                  tidak dapat dibatalkan.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(queue)}>Hapus</AlertDialogAction>
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

      {!isLoading && (queues?.length ?? 0) > 0 && (
        <Pagination
          page={page}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
          onNext={goToNext}
          onPrevious={goToPrevious}
        />
      )}

      <QueueForm open={formOpen} onOpenChange={setFormOpen} />
    </div>
  );
}
