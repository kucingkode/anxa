import { useState } from "react";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { Procedure } from "@simk/contracts";
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
import { Skeleton } from "@/components/ui/skeleton";
import { getErrorMessage } from "@/lib/errors";
import { useAuth } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { useDeleteProcedure, useProcedures } from "../hooks/use-procedures";
import { ProcedureForm } from "./procedure-form";

interface ProcedureListProps {
  patientId: string;
  visitId: string;
}

export function ProcedureList({ patientId, visitId }: ProcedureListProps) {
  const { user } = useAuth();
  const canEdit = hasPermission(user, "procedures:write");
  const canDelete = hasPermission(user, "procedures:delete");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Procedure | undefined>(undefined);

  const { data: procedures, isLoading, isError, error } = useProcedures({ patientId, visitId });
  const deleteMutation = useDeleteProcedure();

  const handleDelete = (procedure: Procedure) => {
    deleteMutation.mutate(procedure.id, {
      onSuccess: () => toast.success("Tindakan dihapus"),
      onError: (err) => toast.error(getErrorMessage(err, "Gagal menghapus tindakan")),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Tindakan</h2>
        {canEdit && (
          <Button onClick={() => { setEditing(undefined); setFormOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Tindakan
          </Button>
        )}
      </div>

      {isError && <p className="text-sm text-destructive">{getErrorMessage(error, "Gagal memuat data tindakan")}</p>}
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kode</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Waktu</TableHead>
              <TableHead>Catatan</TableHead>
              {(canEdit || canDelete) && <TableHead className="text-right">Aksi</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {procedures?.length === 0 && (
              <TableRow>
                <TableCell colSpan={canEdit || canDelete ? 5 : 4} className="text-center text-muted-foreground">
                  Tidak ada tindakan.
                </TableCell>
              </TableRow>
            )}
            {procedures?.map((procedure) => (
              <TableRow key={procedure.id}>
                <TableCell>
                  <span className="font-mono">{procedure.code}</span>
                  {procedure.codeDisplay && <span className="ml-2 text-muted-foreground">{procedure.codeDisplay}</span>}
                </TableCell>
                <TableCell>{procedure.status ?? "—"}</TableCell>
                <TableCell>{procedure.performedAt ?? "—"}</TableCell>
                <TableCell>{procedure.notes ?? "—"}</TableCell>
                {(canEdit || canDelete) && (
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {canEdit && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => { setEditing(procedure); setFormOpen(true); }}
                          aria-label={`Edit ${procedure.code}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      )}
                      {canDelete && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label={`Hapus ${procedure.code}`}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus Tindakan</AlertDialogTitle>
                              <AlertDialogDescription>
                                Yakin ingin menghapus <span className="font-medium">{procedure.code}</span>? Tindakan ini
                                tidak dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(procedure)}>Hapus</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <ProcedureForm
        open={formOpen}
        onOpenChange={(open) => { setFormOpen(open); if (!open) setEditing(undefined); }}
        patientId={patientId}
        visitId={visitId}
        procedure={editing}
      />
    </div>
  );
}
