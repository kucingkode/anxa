import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { Patient } from "@simk/contracts";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { useDebouncedValue } from "@/lib/hooks/use-debounced-value";
import { usePagination } from "@/lib/hooks/use-pagination";
import { Pagination } from "@/components/ui/pagination";
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
import { Badge } from "@/components/ui/badge";
import { GENDER_LABELS } from "@/lib/labels";
import { getErrorMessage } from "@/lib/errors";
import { useAuth } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { useDeletePatient, usePatients } from "../hooks/use-patients";
import { PatientForm } from "./patient-form";

export function PatientList() {
  const { user } = useAuth();
  const canEdit = hasPermission(user, "patients:write");
  const canDelete = hasPermission(user, "patients:delete");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search);
  const { offset, limit, page, hasPrevious, goToNext, goToPrevious } = usePagination(10, debouncedSearch);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Patient | undefined>(undefined);

  const { data: patients, isLoading, isError, error } = usePatients({
    query: debouncedSearch || undefined,
    limit,
    offset,
  });
  const deleteMutation = useDeletePatient();
  const hasNext = (patients?.length ?? 0) === limit;

  const handleDelete = (patient: Patient) => {
    deleteMutation.mutate(patient.id, {
      onSuccess: () => toast.success("Pasien dihapus"),
      onError: (err) => toast.error(getErrorMessage(err, "Gagal menghapus pasien")),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pasien</h1>
        {canEdit && (
          <Button onClick={() => { setEditing(undefined); setFormOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Pasien
          </Button>
        )}
      </div>

      <SearchInput
        placeholder="Cari nama atau NIK…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        containerClassName="max-w-sm"
      />

      {isError && <p className="text-sm text-destructive">{getErrorMessage(error, "Gagal memuat data pasien")}</p>}
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
              <TableHead>Nama</TableHead>
              <TableHead>NIK / IHS</TableHead>
              <TableHead>Jenis Kelamin</TableHead>
              <TableHead>Telepon</TableHead>
              {(canEdit || canDelete) && <TableHead className="text-right">Aksi</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients?.length === 0 && (
              <TableRow>
                <TableCell colSpan={canEdit || canDelete ? 5 : 4} className="text-center text-muted-foreground">
                  Tidak ada pasien.
                </TableCell>
              </TableRow>
            )}
            {patients?.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>
                  <Link to="/patients/$patientId" params={{ patientId: patient.id }} className="font-medium hover:underline">
                    {patient.name}
                  </Link>
                </TableCell>
                <TableCell>{patient.identifier}</TableCell>
                <TableCell>
                  <Badge variant="outline">{GENDER_LABELS[patient.gender] ?? patient.gender}</Badge>
                </TableCell>
                <TableCell>{patient.phone ?? "—"}</TableCell>
                {(canEdit || canDelete) && (
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {canEdit && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => { setEditing(patient); setFormOpen(true); }}
                          aria-label={`Edit ${patient.name}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      )}
                      {canDelete && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label={`Hapus ${patient.name}`}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus Pasien</AlertDialogTitle>
                              <AlertDialogDescription>
                                Yakin ingin menghapus <span className="font-medium">{patient.name}</span>? Tindakan ini
                                tidak dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(patient)}>Hapus</AlertDialogAction>
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

      {!isLoading && (patients?.length ?? 0) > 0 && (
        <Pagination
          page={page}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
          onNext={goToNext}
          onPrevious={goToPrevious}
        />
      )}

      <PatientForm
        open={formOpen}
        onOpenChange={(open) => { setFormOpen(open); if (!open) setEditing(undefined); }}
        patient={editing}
      />
    </div>
  );
}
