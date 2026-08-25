import { useState } from "react";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { Condition } from "@simk/contracts";
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
import { useConditions, useDeleteCondition } from "../hooks/use-conditions";
import { ConditionForm } from "./condition-form";

interface ConditionListProps {
  patientId: string;
  visitId: string;
}

export function ConditionList({ patientId, visitId }: ConditionListProps) {
  const { user } = useAuth();
  const canEdit = hasPermission(user, "conditions:write");
  const canDelete = hasPermission(user, "conditions:delete");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Condition | undefined>(undefined);

  const { data: conditions, isLoading, isError, error } = useConditions({ patientId, visitId });
  const deleteMutation = useDeleteCondition();

  const handleDelete = (condition: Condition) => {
    deleteMutation.mutate(condition.id, {
      onSuccess: () => toast.success("Kondisi dihapus"),
      onError: (err) => toast.error(getErrorMessage(err, "Gagal menghapus kondisi")),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Kondisi</h2>
        {canEdit && (
          <Button onClick={() => { setEditing(undefined); setFormOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Kondisi
          </Button>
        )}
      </div>

      {isError && <p className="text-sm text-destructive">{getErrorMessage(error, "Gagal memuat data kondisi")}</p>}
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
              <TableHead>Status Klinis</TableHead>
              <TableHead>Catatan</TableHead>
              {(canEdit || canDelete) && <TableHead className="text-right">Aksi</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {conditions?.length === 0 && (
              <TableRow>
                <TableCell colSpan={canEdit || canDelete ? 4 : 3} className="text-center text-muted-foreground">
                  Tidak ada kondisi.
                </TableCell>
              </TableRow>
            )}
            {conditions?.map((condition) => (
              <TableRow key={condition.id}>
                <TableCell>
                  <span className="font-mono">{condition.code}</span>
                  {condition.codeDisplay && <span className="ml-2 text-muted-foreground">{condition.codeDisplay}</span>}
                </TableCell>
                <TableCell>{condition.clinicalStatus ?? "—"}</TableCell>
                <TableCell>{condition.notes ?? "—"}</TableCell>
                {(canEdit || canDelete) && (
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {canEdit && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => { setEditing(condition); setFormOpen(true); }}
                          aria-label={`Edit ${condition.code}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      )}
                      {canDelete && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label={`Hapus ${condition.code}`}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus Kondisi</AlertDialogTitle>
                              <AlertDialogDescription>
                                Yakin ingin menghapus <span className="font-medium">{condition.code}</span>? Tindakan ini
                                tidak dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(condition)}>Hapus</AlertDialogAction>
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

      <ConditionForm
        open={formOpen}
        onOpenChange={(open) => { setFormOpen(open); if (!open) setEditing(undefined); }}
        patientId={patientId}
        visitId={visitId}
        condition={editing}
      />
    </div>
  );
}
