import { useState } from "react";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { Manufacturer } from "@simk/contracts";
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
import { useDeleteManufacturer, useManufacturers } from "../hooks/use-manufacturers";
import { ManufacturerForm } from "./manufacturer-form";

export function ManufacturerList() {
  const { user } = useAuth();
  const canEdit = hasPermission(user, "manufacturers:write");
  const canDelete = hasPermission(user, "manufacturers:delete");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search);
  const { offset, limit, page, hasPrevious, goToNext, goToPrevious } = usePagination(10, debouncedSearch);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Manufacturer | undefined>(undefined);

  const { data: manufacturers, isLoading, isError, error } = useManufacturers({
    query: debouncedSearch || undefined,
    limit,
    offset,
  });
  const deleteMutation = useDeleteManufacturer();
  const hasNext = (manufacturers?.length ?? 0) === limit;

  const handleDelete = (manufacturer: Manufacturer) => {
    deleteMutation.mutate(manufacturer.id, {
      onSuccess: () => toast.success("Manufaktur dihapus"),
      onError: (err) => toast.error(getErrorMessage(err, "Gagal menghapus manufaktur")),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manufaktur</h1>
        {canEdit && (
          <Button onClick={() => { setEditing(undefined); setFormOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Manufaktur
          </Button>
        )}
      </div>

      <SearchInput
        placeholder="Cari nama atau identifier…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        containerClassName="max-w-sm"
      />

      {isError && <p className="text-sm text-destructive">{getErrorMessage(error, "Gagal memuat data manufaktur")}</p>}
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
              <TableHead>Identifier</TableHead>
              <TableHead>Kontak</TableHead>
              {(canEdit || canDelete) && <TableHead className="text-right">Aksi</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {manufacturers?.length === 0 && (
              <TableRow>
                <TableCell colSpan={canEdit || canDelete ? 4 : 3} className="text-center text-muted-foreground">
                  Tidak ada manufaktur.
                </TableCell>
              </TableRow>
            )}
            {manufacturers?.map((manufacturer) => (
              <TableRow key={manufacturer.id}>
                <TableCell className="font-medium">{manufacturer.name}</TableCell>
                <TableCell>{manufacturer.identifier}</TableCell>
                <TableCell>{manufacturer.contact ?? "—"}</TableCell>
                {(canEdit || canDelete) && (
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {canEdit && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => { setEditing(manufacturer); setFormOpen(true); }}
                          aria-label={`Edit ${manufacturer.name}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      )}
                      {canDelete && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label={`Hapus ${manufacturer.name}`}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus Manufaktur</AlertDialogTitle>
                              <AlertDialogDescription>
                                Yakin ingin menghapus <span className="font-medium">{manufacturer.name}</span>? Tindakan
                                ini tidak dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(manufacturer)}>Hapus</AlertDialogAction>
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

      {!isLoading && (manufacturers?.length ?? 0) > 0 && (
        <Pagination
          page={page}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
          onNext={goToNext}
          onPrevious={goToPrevious}
        />
      )}

      <ManufacturerForm
        open={formOpen}
        onOpenChange={(open) => { setFormOpen(open); if (!open) setEditing(undefined); }}
        manufacturer={editing}
      />
    </div>
  );
}
