import { useState } from "react";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { User } from "@simk/contracts";
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
import { getErrorMessage } from "@/lib/errors";
import { hasPermission } from "@/lib/permissions";
import { useAuth } from "@/lib/auth";
import { useRoles } from "@/features/roles/hooks/use-roles";
import { useDeleteUser, useUsers } from "../hooks/use-users";
import { UserForm } from "./user-form";

export function UserList() {
  const { user } = useAuth();
  const canEdit = hasPermission(user, "users:write");
  const canDelete = hasPermission(user, "users:delete");
  const { data: roles } = useRoles();
  const roleName = (id: string) => roles?.find((r) => r.id === id)?.name ?? "—";
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search);
  const { offset, limit, page, hasPrevious, goToNext, goToPrevious } = usePagination(10, debouncedSearch);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<User | undefined>(undefined);

  const { data: users, isLoading, isError, error } = useUsers({
    query: debouncedSearch || undefined,
    limit,
    offset,
  });
  const deleteMutation = useDeleteUser();
  const hasNext = (users?.length ?? 0) === limit;

  const handleDelete = (item: User) => {
    deleteMutation.mutate(item.id, {
      onSuccess: () => toast.success("Pengguna dihapus"),
      onError: (err) => toast.error(getErrorMessage(err, "Gagal menghapus pengguna")),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pengguna</h1>
        {canEdit && (
          <Button onClick={() => { setEditing(undefined); setFormOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Pengguna
          </Button>
        )}
      </div>

      <SearchInput
        placeholder="Cari nama atau email…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        containerClassName="max-w-sm"
      />

      {isError && <p className="text-sm text-destructive">{getErrorMessage(error, "Gagal memuat data pengguna")}</p>}
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
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              {(canEdit || canDelete) && <TableHead className="text-right">Aksi</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.length === 0 && (
              <TableRow>
                <TableCell colSpan={canEdit || canDelete ? 4 : 3} className="text-center text-muted-foreground">
                  Tidak ada pengguna.
                </TableCell>
              </TableRow>
            )}
            {users?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name ?? "—"}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  <Badge variant="outline">{roleName(item.roleId)}</Badge>
                </TableCell>
                {(canEdit || canDelete) && (
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {canEdit && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => { setEditing(item); setFormOpen(true); }}
                          aria-label={`Edit ${item.name ?? item.email}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      )}
                      {canDelete && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label={`Hapus ${item.name ?? item.email}`}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus Pengguna</AlertDialogTitle>
                              <AlertDialogDescription>
                                Yakin ingin menghapus <span className="font-medium">{item.name ?? item.email}</span>?
                                Tindakan ini tidak dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(item)}>Hapus</AlertDialogAction>
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

      {!isLoading && (users?.length ?? 0) > 0 && (
        <Pagination
          page={page}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
          onNext={goToNext}
          onPrevious={goToPrevious}
        />
      )}

      <UserForm
        open={formOpen}
        onOpenChange={(open) => { setFormOpen(open); if (!open) setEditing(undefined); }}
        user={editing}
      />
    </div>
  );
}
