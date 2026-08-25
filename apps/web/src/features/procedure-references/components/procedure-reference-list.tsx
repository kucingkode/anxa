import { useState } from "react";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { ProcedureReference } from "@simk/contracts";
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
import { getErrorMessage } from "@/lib/errors";
import { useAuth } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { useDeleteProcedureReference, useProcedureReferences } from "../hooks/use-procedure-references";
import { ProcedureReferenceForm } from "./procedure-reference-form";

export function ProcedureReferenceList() {
  const { user } = useAuth();
  const canEdit = hasPermission(user, "procedure-references:write");
  const canDelete = hasPermission(user, "procedure-references:delete");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search);
  const { offset, limit, page, hasPrevious, goToNext, goToPrevious } = usePagination(10, debouncedSearch);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<ProcedureReference | undefined>(undefined);

  const { data: references, isLoading, isError, error } = useProcedureReferences({
    query: debouncedSearch || undefined,
    limit,
    offset,
  });
  const deleteMutation = useDeleteProcedureReference();
  const hasNext = (references?.length ?? 0) === limit;

  const handleDelete = (reference: ProcedureReference) => {
    deleteMutation.mutate(reference.id, {
      onSuccess: () => toast.success("Referensi prosedur dihapus"),
      onError: (err) => toast.error(getErrorMessage(err, "Gagal menghapus referensi prosedur")),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Referensi Prosedur</h1>
        {canEdit && (
          <Button onClick={() => { setEditing(undefined); setFormOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Referensi
          </Button>
        )}
      </div>

      <SearchInput
        placeholder="Cari kode atau nama…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        containerClassName="max-w-sm"
      />

      {isError && <p className="text-sm text-destructive">{getErrorMessage(error, "Gagal memuat data referensi prosedur")}</p>}
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
              <TableHead>Nama</TableHead>
              {(canEdit || canDelete) && <TableHead className="text-right">Aksi</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {references?.length === 0 && (
              <TableRow>
                <TableCell colSpan={canEdit || canDelete ? 3 : 2} className="text-center text-muted-foreground">
                  Tidak ada referensi prosedur.
                </TableCell>
              </TableRow>
            )}
            {references?.map((reference) => (
              <TableRow key={reference.id}>
                <TableCell className="font-mono">{reference.code}</TableCell>
                <TableCell className="font-medium">{reference.display}</TableCell>
                {(canEdit || canDelete) && (
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {canEdit && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => { setEditing(reference); setFormOpen(true); }}
                          aria-label={`Edit ${reference.display}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      )}
                      {canDelete && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label={`Hapus ${reference.display}`}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus Referensi Prosedur</AlertDialogTitle>
                              <AlertDialogDescription>
                                Yakin ingin menghapus <span className="font-medium">{reference.display}</span>? Tindakan
                                ini tidak dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(reference)}>Hapus</AlertDialogAction>
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

      {!isLoading && (references?.length ?? 0) > 0 && (
        <Pagination
          page={page}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
          onNext={goToNext}
          onPrevious={goToPrevious}
        />
      )}

      <ProcedureReferenceForm
        open={formOpen}
        onOpenChange={(open) => { setFormOpen(open); if (!open) setEditing(undefined); }}
        reference={editing}
      />
    </div>
  );
}
